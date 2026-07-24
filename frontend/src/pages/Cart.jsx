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
 
 const subtotal = cartItems.reduce(
   (total, item) =>
     total + item.price * item.quantity,
   0
 );

 const discount = subtotal * 0.1;

 const gst = (subtotal - discount) * 0.18;

 const totalAmount =
  subtotal - discount + gst;

  return (
    <div className="content">
      <div className="container">
        <h2 className="page-title">Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((book) => (
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
            ))}

            <div className="billing-card">
              <h3>Price Details</h3>

              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="bill-row">
                <span>Discount (10%)</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>

              <div className="bill-row">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>

              <hr />

              <div className="bill-row total-row">
                <span>Total Amount</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>

              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  

}

export default Cart;
