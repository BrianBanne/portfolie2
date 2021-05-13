import React, { useEffect, useState } from "react";
import { AdminAPI, API } from "../../api";
import Layout from "../../components/layout";
import ProductTable from "../../components/tables/product-table";
import Form from "../../components/shared/form";
import Button from "../../components/shared/button";

const AdminProductsPage = () => {
  const [products, setProducts] = useState();
  const [showAddProducts, setShow] = useState(false);
  const PRODUCT_INFO = [
    {
      type: "input",
      label: "Image Url",
      name: "imageUrl",
    },
    {
      type: "input",
      label: "Product name",
      name: "name",
    },
    {
      type: "input",
      label: "stock Status",
      name: "stockQuantity",
    },
    {
      type: "input",
      label: "Price",
      name: "price",
    },
    {
      type: "input",
      label: "description",
      name: "description",
    },
    {
      type: "input",
      label: "short description",
      name: "shortDescription",
    },
    {
      type: "submit",
      className: "button button__secondary mt1",
      label: "Add new",
    },
  ];

  function getProducts() {
    API.getAllProducts()
      .then(({ data }) => setProducts(data.products))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleAddNewProduct(product) {
     AdminAPI.addproduct(product)
    .then(() => getProducts())
    .then(() => setShow(!showAddProducts))
    .then(() => alert(`${product.name} added to collection`))
    .catch((err) => console.log(err));
  }

  function handleEditProduct(product) {
    AdminAPI.deleteProduct(product._id)
      .then(() => alert(`${product.name} deleted`))
      .then(() => getProducts())
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <h1>Products</h1>
      <div>
        <Button
          secondary
          style={{ width: "200px" }}
          label="Add new"
          onClick={() => setShow(!showAddProducts)}
        />
      </div>
      <div>
        {showAddProducts && (
          <Form
            title="Add new"
            items={PRODUCT_INFO}
            onSubmit={handleAddNewProduct}
          />
        )}
      </div>
      <ProductTable products={products} handleEditProduct={handleEditProduct} />
    </Layout>
  );
};

export default AdminProductsPage;
