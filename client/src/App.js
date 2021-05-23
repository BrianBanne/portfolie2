import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/context/auth-context";
import { ShopProvider } from "./components/context/shop-context";
import ProductPage from "./components/product/product";
import ProtectedRoute from "./components/routes/protected-route";
import IndexPage from "./pages";
import AdminPage from "./pages/admin";
import AdminOrdersPage from "./pages/admin/orders";
import AdminProductsPage from "./pages/admin/products";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import LoginPage from "./pages/login";
import ShopPage from "./pages/shop";
import UserPage from "./pages/user";
import UserOrdersPage from "./pages/user/orders";
import "./styles/global.css";

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <IndexPage />
            </Route>
            <Route path="/shop">
              <ShopPage />
            </Route>
            <Route path="/product/:id">
              <ProductPage />
            </Route>

            <Route path="/cart">
              <CartPage />
            </Route>
            <Route path="/checkout">
              <CheckoutPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <ProtectedRoute exact path="/admin">
              <AdminPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/admin/products">
              <AdminProductsPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/admin/order/:id">
              <AdminProductsPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/admin/orders">
              <AdminOrdersPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/user">
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/user/orders">
              <UserOrdersPage />
            </ProtectedRoute>
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;

/* 
 return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  ); */
