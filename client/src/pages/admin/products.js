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
      name: "url",
    },
    {
      type: "input",
      label: "Product name",
      name: "productname",
    },
    {
      type: "input",
      label: "stock Status",
      name: "stockstatus",
    }, 
    {
      type: "input",
      label: "Price",
      name: "price",
    },
    {
      type: "input",
      label: "Category",
      name: "category",
    },
    {
      type: "submit",
      className: "button button__secondary mt1",
      label: "Add new",
      onClick : handleAddNewProduct(),
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
    console.log(product);
    AdminAPI.addproduct(product)
    .then(() => getProducts())
    .catch((err) => console.log(err));
  }

  function handleEditProduct(product) {
    console.log(product);
    AdminAPI.deleteProduct(product._id)
      .then(() => alert(`${product.name} deleted`))
      .then(() => getProducts())
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <h1>Products</h1>
      <div>
        <Button secondary style={{width:'200px'}} label="Add new" onClick={()=>setShow(!showAddProducts)}/>
      </div>
      <div>

      {showAddProducts&&<Form
        title="Add new"
        items ={PRODUCT_INFO}
        onSubmit={handleAddNewProduct}
      />}
      </div>
      <ProductTable products={products} handleEditProduct={handleEditProduct} />
    </Layout>
  );
};

export default AdminProductsPage;