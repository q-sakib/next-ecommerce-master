// Wishlist Item Component
// import Image from "next/image";
import React from "react";

type Props = {
  id: string;
  // images: string;
  name: string;
  thumb: string;
  price: number;
  onRemove: () => void;
};

const WishlistItem: React.FC<Props> = ({ id, name, thumb, price, onRemove }) => {
  


  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt={name} />
          </div>
          <div className="cart-product__content">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td>${price.toFixed(2)}</td>
      <td className="cart-item-cancel">
        <i className="icon-cancel" onClick={onRemove} />
      </td>
    </tr>
  );
};

export default WishlistItem;