const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'coffee_shop'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL DB');
});

app.get('/', (req, res) => {
  res.send('API is running!');
});

// Shared status update function
function updateReservationStatus(reservationId, status, res) {
  if (!['pending', 'confirmed', 'declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const sql = 'UPDATE reservations SET status = ? WHERE id = ?';
  db.query(sql, [status, reservationId], (err, result) => {
    if (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ message: `Reservation status updated to ${status}` });
  });
}

// Login
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ? AND role = ?';
  db.query(sql, [username, password, role], (err, result) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.length > 0) {
      return res.json({ success: true, user: result[0] }); // Optionally return user data
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Register
app.post('/api/register', (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing registration info' });
  }

  const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [username, email, password, role || 'client'], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ success: false, message: "Database error." });
    }
    res.json({ success: true, message: "User registered successfully." });
  });
});

// Submit Reservation
app.post('/api/reservations', (req, res) => {
  const { name, phone, date, guests, seating, occasion, request } = req.body;

  if (!name || !phone || !date || !guests || !seating) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  const sql = `
    INSERT INTO reservations (name, phone, date, guests, seating, occasion, request, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

  db.query(
    sql,
    [name, phone, date, guests, seating, occasion || '', request || ''],
    (err, result) => {
      if (err) {
        console.error('Error inserting reservation:', err);
        return res.status(500).json({ message: 'Failed to save reservation' });
      }
      res.status(200).json({ message: 'Reservation saved successfully' });
    }
  );
});

// Get all reservations
app.get('/api/reservations', (req, res) => {
  const sql = 'SELECT * FROM reservations ORDER BY date ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching reservations:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

app.put('/api/reservations/:id/status', (req, res) => {
  const reservationId = req.params.id;
  const { status } = req.body;

  // Allowed statuses for this endpoint
  const allowedStatuses = ['confirmed', 'declined'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  // If you want to enforce clients can only decline, 
  // you can skip because you don't have role info here,
  // or just trust frontend to send correct status

  updateReservationStatus(reservationId, status, res);
});

function updateReservationStatus(id, status, res) {
  const query = 'UPDATE reservations SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update reservation status.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }
    res.json({ message: `Reservation ${status} successfully.` });
  });
}



// Admin updates any status
app.put('/api/reservations/:id/status', (req, res) => {
  const reservationId = req.params.id;
  const { status } = req.body;

  updateReservationStatus(reservationId, status, res);
});

// Admin users
app.get('/api/users/role/admin', (req, res) => {
  const sql = "SELECT id, username, email, role FROM users WHERE role = 'admin'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching admins:", err);
      return res.status(500).json({ error: "Failed to fetch admin users" });
    }
    res.json(results);
  });
});

// Client users
app.get('/api/users/role/client', (req, res) => {
  const sql = "SELECT id, username, email, role FROM users WHERE role = 'client'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching clients:", err);
      return res.status(500).json({ error: "Failed to fetch client users" });
    }
    res.json(results);
  });
});

// Return total reservation count (not filtered by user)
app.get('/api/reservations/count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM reservations';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Query failed' });
    }
    res.json({ count: results[0].count });
  });
});

app.get("/api/admin/dashboard-summary", (req, res) => {
  const summary = {
    totalReservations: 0,
    pendingApprovals: 0,
    registeredUsers: 0,
    revenue: 0,
    weeklyReservations: [], // For bar chart
    statusBreakdown: [],     // For pie chart
  };

  db.query("SELECT COUNT(*) AS total FROM reservations", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    summary.totalReservations = results[0].total;
    summary.revenue = summary.totalReservations * 500;

    db.query("SELECT COUNT(*) AS pending FROM reservations WHERE status = 'pending'", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      summary.pendingApprovals = results[0].pending;

      db.query("SELECT COUNT(*) AS users FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        summary.registeredUsers = results[0].users;

        // Pie chart data
        db.query(
          `SELECT status AS name, COUNT(*) AS value FROM reservations GROUP BY status`,
          (err, statusResults) => {
            if (err) return res.status(500).json({ error: err.message });
            summary.statusBreakdown = statusResults;

            // Bar chart data
            db.query(
              `SELECT 
                 DAYNAME(date) AS day, 
                 COUNT(*) AS reservations 
               FROM reservations 
               WHERE date >= CURDATE() - INTERVAL 7 DAY 
               GROUP BY DAYNAME(date)
               ORDER BY FIELD(DAYNAME(date), 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`,
              (err, weekResults) => {
                if (err) return res.status(500).json({ error: err.message });
                summary.weeklyReservations = weekResults;

                res.json(summary);
              }
            );
          }
        );
      });
    });
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
