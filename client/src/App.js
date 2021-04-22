import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/global.css";
import IndexPage from "./pages";
import AdminPage from "./pages/admin";
import ShopPage from "./pages/shop";
import { AppProvider } from "./components/context/app-context";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route path="/shop">
            <ShopPage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

/*   return (
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
