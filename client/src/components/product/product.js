import React from "react";
import { useParams } from "react-router";
import AddToCartButton from "../cart/add-to-cart-button";
import Layout from "../layout";

const ProductPage = ({ data }) => {
  //TODO: get slug from server
  const { id } = useParams();
  const product = data.find((p) => p.id === Number(id));
  console.log(product);


  const StockStatus = ({ product }) => {
    if (product.stockStatus > 0)
      return (
        <span style={{ color: "green" }}>{product.stockStatus} in stock</span>
      );
    else return <span style={{ color: "red" }}>out of stock :(</span>;
  };

  if (!product)
    return (
      <Layout>
        <p>This product does not exist.. :(</p>
      </Layout>
    );
  const { name, imageUrl, price, description } = product;

  return (
    <Layout>
      <article className="product" style={{ margin: "0 auto" }}>
        <figure className="product__column">
          <img
            src={imageUrl}
            style={{ width: "100%", objectFit: "cover" }}
            alt="t-skjorte"
          />
        </figure>

        <div className="product__column">
          <h2 style={{ textAlign: "left" }}>{name}</h2>
          <p>{description}</p>
          <span style={{ display: "block" }}>{price} kr</span>
          <p><StockStatus product={product}/></p>
          <AddToCartButton product={product} inInStock={product.stockStatus > 0} />
        </div>
      </article>
    </Layout>
  );
};

export default ProductPage;
