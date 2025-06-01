import { useEffect, useState } from "react";
import axios from "axios";

function AdminManageUsers() {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch Admins
    axios.get("http://localhost:5000/api/users/role/admin")
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error("Error fetching admins:", error);
      });

    // Fetch Clients (Users)
    axios.get("http://localhost:5000/api/users/role/client")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching clients:", error);
      });
  }, []);


  const renderTable = (data, title) => (
    <div className="mb-10">
      <h2 className="text-lg font-medium mb-2 border-b border-gray-300 pb-1">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-black text-sm">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-2 border border-black text-left">ID</th>
              <th className="px-4 py-2 border border-black text-left">Username</th>
              <th className="px-4 py-2 border border-black text-left">Email</th>
              <th className="px-4 py-2 border border-black text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No {title.toLowerCase()} found.
                </td>
              </tr>
            ) : (
              data.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-black">{user.id}</td>
                  <td className="px-4 py-2 border border-black">{user.username}</td>
                  <td className="px-4 py-2 border border-black">{user.email}</td>
                  <td className="px-4 py-2 border border-black">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-8 text-black bg-white">
      <h1 className="text-2xl font-bold mb-6 border-b border-black pb-2">Manage Users</h1>
      {renderTable(admins, "Admin Accounts")}
      {renderTable(users, "User Accounts")}
    </div>
  );
}

export default AdminManageUsers;
