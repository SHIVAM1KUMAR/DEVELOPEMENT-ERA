import React, { useState, useMemo } from "react";

const cart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 30000 },
    { id: 3, name: "Headphones", price: 2000 },
  ]);

  const [discount, setDiscount] = useState(0);

  const totalPrice = useMemo(() => {
    console.log("Calculating total price...");

    return cart.reduce((total, item) => total + item.price, 0);

  }, [cart]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <p key={item.id}>
          {item.name} : {item.price}
        </p>
      ))}

      <h3>Total Price : {totalPrice}</h3>

      <button onClick={() =>{ console.log("discount button clicked")
        setDiscount(discount + 10)}}>
        Increase Discount
      </button>
    </div>
  );
};

export default cart;
