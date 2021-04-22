import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../cart/add-to-cart-button";

const ProductPreview = ({ product }) => {
  const { name, imageUrl, price } = product;
  const slug = "123";
  //TODO: get slug from server
  return (
    <div className="productPreview">
      <Link to={`/product/${slug}`} className="productPreview__link">
        <figure className="productPreview__figure">
          <img
            src={imageUrl}
            style={{ width: "100%", objectFit: "cover" }}
            alt="t-skjorte"
          />
        </figure>
        </Link>

        <div className="productPreview__info">
          <h2>{name}</h2>
          <span style={{display:'block'}}>{price} kr</span>
         <AddToCartButton product={product}/>
        </div>
    </div>
  );
};

export default ProductPreview;
