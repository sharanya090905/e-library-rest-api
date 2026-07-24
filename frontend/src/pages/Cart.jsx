import { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
  const items =
    JSON.parse(localStorage.getItem("cart")) || [];

  return items.map((item) => ({
    ...item,
    quantity: item.quantity || 1,
  }));
});

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(
      (book) => book._id !== id
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? {
          ...item,
          quantity: item.quantity + 1,
          }
        : item
    );

   setCartItems(updatedCart);

   localStorage.setItem(
     "cart",
     JSON.stringify(updatedCart)
   );
 };

 const decreaseQuantity = (id) => {
   const updatedCart = cartItems.map((item) =>
     item._id === id
       ? {
          ...item,
          quantity: Math.max(
            item.quantity - 1,
            1
          ),
         }
       : item
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
 };



  return (
    <div className="content">
      <div className="container">
        <h2 className="page-title">Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((book) => (
            <div key={book._id} className="book-card">
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                
                <p>
                  <strong>Category:</strong> {book.category}
                </p>
                

                <p>
                  <strong>Price:</strong> ₹{book.price}
                </p>

                <div className="cart-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        decreaseQuantity(book._id)
                      }
                    >
                      -
                    </button>

                    <span>{book.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(book._id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeFromCart(book._id)
                    }
                  >
                    Remove
                  </button>
                </div>

              </div>
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-image"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
