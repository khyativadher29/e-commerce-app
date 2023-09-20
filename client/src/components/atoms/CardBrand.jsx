import React from "react";

function CardBrand({ brand, name }) {
  return (
    <div className="d-flex justify-content-between mt-2">
      <h5 className="wishlist__brand-name">{brand}</h5>
      <h5 className="wishlist__brand-name">{name}</h5>
    </div>
  );
}

export default CardBrand;
