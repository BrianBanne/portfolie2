import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../api";
import Layout from "../layout";

const ProductPage = () => {
  //TODO: get slug from server
  const { id } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    API.getOrderById(id)
      .then(({ data }) => setOrder(data.product))
      .catch((err) => console.log(err));
  }, [id]);

  console.log(order);

  if (!order)
    return (
      <Layout>
        <p>This product does not exist.. :(</p>
      </Layout>
    );

  return (
    <Layout>
      <h1>Order items</h1>
    </Layout>
  );
};

export default ProductPage;
