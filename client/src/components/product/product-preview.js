import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../cart/add-to-cart-button";

const ProductPreview = ({ product }) => {
  //sku eller id i link-to? 
  const { name, imageUrl, price, id, stockQuantity } = product;
  console.log(stockQuantity);
  //TODO: get slug from server
  return (
    <div className="productPreview">
      <Link to={`/product/${id}`} className="productPreview__link">
        <figure className="productPreview__figure">
          <img
            src={imageUrl}
            style={{ width: "100%", objectFit: "cover" }}
            alt="t-skjorte"
          />
        </figure>
      </Link>
      <div className="productPreview__info">
        <h2 style={{textAlign:'right'}}>
          <Link to={`/product/${id}`} className="productPreview__link">
            {name}
          </Link>
        </h2>
        <span style={{ display: "block" }}>{price} kr</span>
      </div>
      <AddToCartButton inInStock={stockQuantity > 0} product={product} />

    </div>
  );
};

export default ProductPreview;