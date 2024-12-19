import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavProduct } from "store/reducers/user";
import type { RootState } from "store";
import WishlistItem from "./item";
import productsData from "../../utils/data/products";
import { useRouter } from "next/router";
import Toast from "./Toast";  // Import the Toast component

const WishlistPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Extract favorite product IDs from the Redux store
  const { favProducts } = useSelector((state: RootState) => state.user);
  // Map IDs to their product details
  const wishlistProducts = favProducts
    .map((id: string) => productsData.find((product) => product.id === id))
    .filter(Boolean);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const removeFromWishlist = (id: string) => {
    dispatch(toggleFavProduct({ id }));
  };

  const removeAllFromWishlist = () => {
    // Remove all items from the wishlist
    favProducts.forEach((id: string) => dispatch(toggleFavProduct({ id })));

    // Set and show the custom toast message
    setToastMessage("Your wishlist has been cleared!");
    setToastVisible(true);

    // Hide toast after 3 seconds
    setTimeout(() => setToastVisible(false), 3000);

    // Close the confirmation popup after the action
    setShowConfirmation(false);
  };

  const redirectToProductPage = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleCancel = () => {
    // Close the confirmation popup when cancel is clicked
    setShowConfirmation(false);
  };

  return (
    <section className="cart wishlist">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">My Wishlist</h3>
        </div>

        <div className="cart-list">
          {wishlistProducts.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Price</th>
                  <th />
                </tr>

                {wishlistProducts.map((product: any) => (
                  <WishlistItem
                    key={product.id}
                    id={product.id}
                    name={
                      <a
                        onClick={() => redirectToProductPage(product.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {product.name}
                      </a>
                    }
                    thumb={product.images ? product.images[0] : ""}
                    price={product.price}
                    onRemove={() => removeFromWishlist(product.id)}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>

        <div className="cart-actions">
          <a href="/products" className="cart__btn-back">
            <i className="icon-left" /> Continue Shopping
          </a>

          {/* Remove All Button */}
          <button
            onClick={() => setShowConfirmation(true)}  // Trigger confirmation on first click
            className="cart__btn-remove-all"
          >
            {showConfirmation
              ? "Are you sure? Click again to confirm."
              : "Remove All from Wishlist"}
          </button>

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="confirmation-popup">
              <div className="popup-overlay" onClick={handleCancel} />
              <div className="popup-content">
                <h4>Are you sure you want to remove all items from your wishlist?</h4>
                <button onClick={removeAllFromWishlist}>OK</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Toast */}
      <Toast message={toastMessage} isVisible={toastVisible} />
    </section>
  );
};

export default WishlistPage;
