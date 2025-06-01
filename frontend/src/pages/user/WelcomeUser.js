import React from "react";

const photos = [
  { id: 1, src: "/images/coffee-shop1.jpg", alt: "Cozy coffee shop interior" },
  { id: 2, src: "/images/coffee-cup.jpg", alt: "Coffee cup with latte art" },
  { id: 3, src: "/images/pastry.jpg", alt: "Delicious pastry" },
  { id: 4, src: "/images/cocktail.jpg", alt: "Refreshing cocktail drink" },
  { id: 5, src: "/images/coffee-beans.jpg", alt: "Coffee beans close-up" },
  { id: 6, src: "/images/food-plate.jpg", alt: "Tasty food plate" },
];

function WelcomeUser() {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4 text-black">WELCOME, CLIENT!</h1>
        <p className="text-gray-600 text-lg">
          Start by making a reservation or check your profile.
        </p>
      </div>

      <h2 className="text-center text-2xl font-semibold mb-6 text-black">
        Our Coffee & Food Moments
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="overflow-hidden rounded-lg border border-black"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-48 object-cover grayscale hover:grayscale-0 transition duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomeUser;
