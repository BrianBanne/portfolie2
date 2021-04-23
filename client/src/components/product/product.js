import React from "react";
import { useParams } from "react-router";
import AddToCartButton from "../cart/add-to-cart-button";
import Layout from "../layout";

const ProductPage = ({ data }) => {
  //TODO: get slug from server
  const { id } = useParams();
  const product = data.find((p) => p.id === Number(id));

  console.log(id);

  if (!product)
    return (
      <Layout>
        <p>This product does not exist.. :(</p>
      </Layout>
    );
  const { name, imageUrl, price, description } = product;

  return (
    <Layout>
      <div className="productPreview" style={{margin: '0 auto'}}>
        <figure className="productPreview__figure">
          <img
            src={imageUrl}
            style={{ width: "100%", objectFit: "cover" }}
            alt="t-skjorte"
          />
        </figure>

        <div className="productPreview__info">
          <h2>{name}</h2>
          <p>{description}</p>
          <span style={{ display: "block" }}>{price} kr</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
