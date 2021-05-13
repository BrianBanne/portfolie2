import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../api";
import AddToCartButton from "../cart/add-to-cart-button";
import Layout from "../layout";

const ProductPage = ({ data }) => {
  //TODO: get slug from server
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    API.getProductFromId(id)
      .then(({ data }) => setProduct(data.product))
      .catch((err) => console.log(err));
  }, [id]);

  const StockStatus = ({ product }) => {
    if (product.stockQuantity > 0)
      return (
        <span style={{ color: "green" }}>{product.stockQuantity} in stock</span>
      );
    else return <span style={{ color: "red" }}>out of stock :(</span>;
  };

  if (!product)
    return (
      <Layout>
        <p>This product does not exist.. :(</p>
      </Layout>
    );

  return (
    <Layout>
      <article className="product" style={{ margin: "0 auto" }}>
        <div className="product__row">
          <figure className="product__column">
            <img
              src={product.imageUrl}
              style={{ width: "100%", objectFit: "cover" }}
              alt="t-skjorte"
            />
          </figure>

          <div className="product__column">
            <h2 style={{ textAlign: "left" }}>{product.name}</h2>
            <p>{product.description}</p>
            <span style={{ display: "block" }}>{product.price} kr</span>
            <p>
              <StockStatus product={product} />
            </p>
            <AddToCartButton
              product={product}
              inInStock={product.stockQuantity > 0}
            />
          </div>
        </div>
        <div className="product__row" style={{ margin: "2rem" }}>
          <div className="product__column">
            <h3>Description</h3>
            <p>{product.shortDescription}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProductPage;
