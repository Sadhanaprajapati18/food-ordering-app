import { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    house: "",
    area: "",
    city: "",
    pincode: "",
  });

  const foods = [
    {
      id: 1,
      name: "Pizza",
      price: 199,
      emoji: "🍕",
    },
    {
      id: 2,
      name: "Burger",
      price: 99,
      emoji: "🍔",
    },
    {
      id: 3,
      name: "French Fries",
      price: 79,
      emoji: "🍟",
    },
    {
      id: 4,
      name: "Biryani",
      price: 149,
      emoji: "🍛",
    },
    {
      id: 5,
      name: "Sandwich",
      price: 89,
      emoji: "🥪",
    },
    {
      id: 6,
      name: "Cold Drink",
      price: 49,
      emoji: "🥤",
    },
  ];

  // Add item to cart
  const addToCart = (food) => {
    const existingItem = cart.find((item) => item.id === food.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Address change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress({
      ...address,
      [name]: value,
    });
  };

  // Place order
  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (
      !address.name ||
      !address.mobile ||
      !address.house ||
      !address.area ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill all delivery address details!");
      return;
    }

    alert(
      `Order placed successfully! 🎉

Delivery Address:
${address.name}
${address.house}, ${address.area}
${address.city} - ${address.pincode}
Mobile: ${address.mobile}

Total Amount: ₹${total}`
    );

    // Clear cart
    setCart([]);

    // Clear address
    setAddress({
      name: "",
      mobile: "",
      house: "",
      area: "",
      city: "",
      pincode: "",
    });
  };

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>🍽️ Food Ordering System</h1>
        <p>Welcome to our Food Store</p>
      </header>

      <main>
        {/* Menu */}
        <h2>Our Menu</h2>

        <div className="food-container">
          {foods.map((food) => (
            <div className="food-card" key={food.id}>
              <div className="food-image">{food.emoji}</div>

              <h3>{food.name}</h3>

              <p>₹{food.price}</p>

              <button onClick={() => addToCart(food)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="cart">
          <h2>🛒 Your Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span>
                    {item.emoji} {item.name} - ₹{item.price}
                  </span>

                  <div>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span style={{ margin: "0 10px" }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <h3>Total: ₹{total}</h3>

              {/* Delivery Address */}
              <div className="address-form">
                <h2>📍 Delivery Address</h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={address.name}
                  onChange={handleAddressChange}
                />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={address.mobile}
                  onChange={handleAddressChange}
                />

                <input
                  type="text"
                  name="house"
                  placeholder="House / Flat / Building"
                  value={address.house}
                  onChange={handleAddressChange}
                />

                <input
                  type="text"
                  name="area"
                  placeholder="Area / Street"
                  value={address.area}
                  onChange={handleAddressChange}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleAddressChange}
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={handleAddressChange}
                />
              </div>

              {/* Place Order */}
              <button
                className="order-button"
                onClick={placeOrder}
              >
                🛍️ Place Order
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;