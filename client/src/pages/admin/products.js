import React, { useEffect, useRef, useState } from "react";
import { AdminAPI, API } from "../../api";
import Layout from "../../components/layout";
import ProductTable from "../../components/tables/product-table";
import Form from "../../components/shared/form";
import Button from "../../components/shared/button";

const AdminProductsPage = () => {
  const [products, setProducts] = useState();
  const [showProductForm, setShowProductForm] = useState(false);
  const [initialValues, setInitalValues] = useState();
  const formRef = useRef();
  const PRODUCT_INFO = [
    {
      type: "title",
      label: `${initialValues ? "Update product" : "Add product"}`,
    },
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
      label: `${initialValues ? "Update" : "Add new"}`,
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

  function submitFormData(product) {
    if (initialValues) {
      AdminAPI.editProduct(product._id, product)
        .then(() => alert(`Updated product ${product.name}`))
        .then(() => setShowProductForm(false))
        .then(() => getProducts())
        .catch((err) => console.log(err));
    } else {
      AdminAPI.addproduct(product)
        .then(() => getProducts())
        .then(() => setShowProductForm(!showProductForm))
        .then(() => alert(`${product.name} added to collection`))
        .catch((err) => console.log(err));
    }
  }

  function handleEditProduct(product) {
    setInitalValues(product);
    setShowProductForm(true);
    formRef.current.scrollIntoView();
  }

  function handleDeleteProduct(product) {
    AdminAPI.deleteProduct(product._id)
      .then(() => alert(`${product.name} deleted`))
      .then(() => getProducts())
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <h1>Products</h1>
      <section ref={formRef}>
        <Button
          secondary
          style={{ width: "200px" }}
          label={showProductForm ? "Close" : "Add new"}
          onClick={() => {
            setInitalValues(false);
            setShowProductForm(!showProductForm);
          }}
        />
        {showProductForm && (
          <Form
            items={PRODUCT_INFO}
            onSubmit={submitFormData}
            initialValues={initialValues}
          />
        )}
      </section>
      <ProductTable
        products={products}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
      />
    </Layout>
  );
};

export default AdminProductsPage;
