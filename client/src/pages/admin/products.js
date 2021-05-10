import React from "react";
import { TestAPI } from "../../api/test-api";
import { useReducer } from "react";
import Layout from "../../components/layout";
import ProductTable from "../../components/tables/product-table";


const storage = localStorage.getItem("productlist")
? JSON.parse(localStorage.getItem("productlist"))
: [];

const initialState = {
  productlist: storage,
};


function setLocalStorage(productlist) {
  localStorage.setItem("produclist", JSON.stringify(productlist.length > 0 ? productlist : []));
}

const ProductReducer = (state, action) => {
switch (action.type) {
  case "REMOVE":
    return {
      ...state,
      productlist: state.productlist.filter(({ id }) => id !== action.payload.id),
      ...setLocalStorage(state.productlist),
       
    };

    default:
      return { state };

}
};
    //idk what the fuck i am doing
const AdminProductsPage = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  function handleEditProduct(product){
    console.log(product);
    //api remove product and fetch new
  }
  function handleDeleteProduct(product) {
    console.log(product);
    dispatch({ type: "REMOVE", product });
    
  }

  const produclistActions = {
    handleDeleteProduct,
    ...state,
  };

  return (
    <Layout>
      <h1>Products</h1>
      <ProductTable products={TestAPI.PRODUCTS} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct}/>
    </Layout>
  );
};

export default AdminProductsPage;
