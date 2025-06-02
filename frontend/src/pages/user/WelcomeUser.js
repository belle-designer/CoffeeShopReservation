import React, { useState } from "react";
import img1 from "../../assets/01.jpg";
import img2 from "../../assets/02.jpg";
import img3 from "../../assets/03.jpg";
import img4 from "../../assets/04.jpg";
import img5 from "../../assets/05.jpg";
import img6 from "../../assets/06.jpg";

const photos = [
  { id: 1, src: img1, alt: "Cozy coffee shop interior" },
  { id: 2, src: img2, alt: "Coffee cup with latte art" },
  { id: 3, src: img3, alt: "Delicious pastry" },
  { id: 4, src: img4, alt: "Refreshing cocktail drink" },
  { id: 5, src: img5, alt: "Coffee beans close-up" },
  { id: 6, src: img6, alt: "Tasty food plate" },
];

const menuItems = {
  Drinks: [
    { id: 1, name: "Cappuccino", description: "Espresso with steamed milk.", price: "₱220" },
    { id: 2, name: "Latte", description: "Smooth espresso with milk foam.", price: "₱248" },
    { id: 3, name: "Americano", description: "Espresso with hot water.", price: "₱193" },
    { id: 4, name: "Espresso", description: "Strong and bold.", price: "₱165" },
    { id: 5, name: "Macchiato", description: "Espresso with a dash of foam.", price: "₱198" },
    { id: 6, name: "Mocha", description: "Chocolate, espresso, steamed milk.", price: "₱275" },
    { id: 7, name: "Iced Coffee", description: "Chilled coffee with milk.", price: "₱198" },
    { id: 8, name: "Flat White", description: "Smooth espresso with thin milk.", price: "₱220" },
    { id: 9, name: "Chai Latte", description: "Spiced tea with steamed milk.", price: "₱220" },
    { id: 10, name: "Hot Chocolate", description: "Rich and creamy chocolate.", price: "₱198" },
  ],
  Pastries: [
    { id: 11, name: "Croissant", description: "Flaky buttery croissant.", price: "₱138" },
    { id: 12, name: "Muffin", description: "Choice of blueberry or chocolate.", price: "₱151" },
    { id: 13, name: "Scone", description: "Served with butter and jam.", price: "₱162" },
    { id: 14, name: "Danish Pastry", description: "Fruit-filled flaky pastry.", price: "₱165" },
    { id: 15, name: "Cinnamon Roll", description: "Sweet roll with cinnamon glaze.", price: "₱176" },
    { id: 16, name: "Eclair", description: "Choux pastry with cream filling.", price: "₱176" },
    { id: 17, name: "Cheesecake Slice", description: "Creamy cheesecake slice.", price: "₱220" },
    { id: 18, name: "Banana Bread", description: "Moist banana loaf.", price: "₱154" },
    { id: 19, name: "Apple Turnover", description: "Pastry filled with spiced apples.", price: "₱165" },
    { id: 20, name: "Brownie", description: "Rich chocolate brownie.", price: "₱165" },
  ],
  Meals: [
    { id: 21, name: "Avocado Toast", description: "Sourdough, avocado, chili.", price: "₱330" },
    { id: 22, name: "Club Sandwich", description: "Triple-decker sandwich.", price: "₱413" },
    { id: 23, name: "Caesar Salad", description: "Romaine, croutons, dressing.", price: "₱275" },
    { id: 24, name: "Quiche Lorraine", description: "Egg tart with bacon.", price: "₱330" },
    { id: 25, name: "Grilled Cheese", description: "Melted cheese sandwich.", price: "₱220" },
    { id: 26, name: "BLT Sandwich", description: "Bacon, lettuce, tomato.", price: "₱275" },
    { id: 27, name: "Pasta Alfredo", description: "Creamy white sauce pasta.", price: "₱385" },
    { id: 28, name: "Veggie Wrap", description: "Fresh vegetables in a tortilla.", price: "₱275" },
    { id: 29, name: "Tomato Soup", description: "Creamy tomato soup.", price: "₱198" },
    { id: 30, name: "Chicken Salad", description: "Mixed greens with chicken.", price: "₱330" },
  ],
  Cocktails: [
    { id: 31, name: "Mojito", description: "Mint, lime, rum, soda.", price: "₱358" },
    { id: 32, name: "Old Fashioned", description: "Whiskey, bitters, sugar.", price: "₱426" },
    { id: 33, name: "Piña Colada", description: "Pineapple, coconut, rum.", price: "₱385" },
    { id: 34, name: "Cosmopolitan", description: "Vodka, cranberry, lime.", price: "₱385" },
    { id: 35, name: "Margarita", description: "Tequila, lime, triple sec.", price: "₱385" },
    { id: 36, name: "Daiquiri", description: "Rum, lime, sugar.", price: "₱330" },
    { id: 37, name: "Negroni", description: "Gin, vermouth, bitters.", price: "₱385" },
    { id: 38, name: "Gin & Tonic", description: "Gin and tonic water.", price: "₱275" },
    { id: 39, name: "Whiskey Sour", description: "Whiskey, lemon, sugar.", price: "₱385" },
    { id: 40, name: "Bloody Mary", description: "Vodka, tomato juice, spices.", price: "₱385" },
  ],
};

const bestSellerIds = new Set([1, 6, 11, 21, 31]); // example best sellers by id

function WelcomeUser() {
  const [activeCategory, setActiveCategory] = useState("Drinks");

  return (
    <div className="min-h-screen bg-white text-black font-sans px-6 md:px-12 py-12 mx-auto">
      <header className="mt-3 mb-10 text-center">
        <h1 className="text-5xl font-bold mb-2">WELCOME, CLIENT!</h1>
        <p className="text-gray-700 text-sm uppercase">
          Start by making a reservation or checking your profile.
        </p>
      </header>

      <main className="flex flex-col md:flex-row gap-12" style={{ height: "600px" }}>
        {/* Gallery */}
        <section className="md:w-2/5 flex flex-col">
          <h2 className="text-3xl font-semibold mb-8 border-b border-gray-300 pb-2 text-center uppercase">
            Our Moments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 overflow-y-auto flex-grow">
            {photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover rounded-lg shadow-md"
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        </section>

        {/* Menu */}
        <section className="md:w-3/5 flex flex-col">
          <h2 className="text-3xl font-semibold mb-8 border-b border-gray-300 pb-2 text-center uppercase">
            Menu
          </h2>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {Object.keys(menuItems).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  activeCategory === category
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                } transition-all duration-200`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-grow pr-2">
            {menuItems[activeCategory].map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <h4 className="text-lg font-semibold mb-1 flex items-center gap-2">
                  {item.name}
                  {bestSellerIds.has(item.id) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#BB271A"
                      aria-label="Best Seller"
                      role="img"
                    >
                      <path d="m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
                    </svg>
                  )}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-base font-medium">{item.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default WelcomeUser;
