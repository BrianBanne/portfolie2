import React, { useEffect, useRef, useState } from "react";
import { API } from "../../api";
import Layout from "../../components/layout";
import Button from "../../components/shared/button";
import Form from "../../components/shared/form";
import ProductTable from "../../components/tables/product-table";
import { validateProducts } from "../../utils/helpers";

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
    const isProductsValidated = validateProducts(product);
    if (!isProductsValidated) {
      alert("You have some missing fields :(");
      return;
    }
    if (initialValues) {
      API.editProduct(product._id, product)
        .then(() => alert(`Updated product ${product.name}`))
        .then(() => setShowProductForm(false))
        .then(() => getProducts())
        .catch((err) => {
          alert("Could not update..check that all values are correct");
          console.log(err);
        });
    } else {
      API.addproduct(product)
        .then(() => getProducts())
        .then(() => setShowProductForm(!showProductForm))
        .then(() => alert(`${product.name} added to collection`))
        .catch((err) => {
          alert("Could not update..check that all values are correct");
          console.log(err);
        });
    }
  }

  function handleEditProduct(product) {
    setInitalValues(product);
    setShowProductForm(true);
    formRef.current.scrollIntoView();
  }

  function handleDeleteProduct(product) {
    API.deleteProduct(product._id)
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
