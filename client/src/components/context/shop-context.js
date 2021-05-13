import { createContext, useReducer } from "react";

export const ShopContext = createContext();

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cart: storage,
};


function setLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart.length > 0 ? cart : []));
}

const ShopReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(action.payload.id);
      if (!state.cart.find((product) => product.id === action.payload.id)) {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        state.cart[state.cart.findIndex(({ id }) => id === action.payload.id)]
          .quantity++;
      }

      return {
        ...state,
        cart: [...state.cart],
        ...setLocalStorage(state.cart),
      };
          //øker med 2 ad gangen
    case "INCREMENT":
      state.cart[state.cart.findIndex(({ id }) => id === action.payload.id)]
        .quantity++;
      return {
        ...state,
        cart: [...state.cart],
        ...setLocalStorage(state.cart),
      };

    case "DECREMENT":
      // slår ann feil når man reduserer til 0, fikk det ikke til å funke med min fiks
      state.cart[state.cart.findIndex(({ id }) => id === action.payload.id)]
        .quantity--;
        if ([state.cart.findIndex(({ id }) => id === action.payload.id)].quantity <= 0) {
          return 0;
        } else {
      
      return { ...state, cart: [...state.cart] };
        }

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter(({ id }) => id !== action.payload.id),
        ...setLocalStorage(state.cart),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        ...setLocalStorage([]),
      };

    default:
      return { state };
  }
};

export const ShopProvider = ({ children }) => {
  //const [cart, addToCart] = useCart([]);
  const [state, dispatch] = useReducer(ShopReducer, initialState);

  function increment(payload) {
    console.log("how many");
    dispatch({ type: "INCREMENT", payload });
  }

  function decrement(payload) {
    dispatch({ type: "DECREMENT", payload });
  }

  function addToCart(payload) {
    console.log("how many");
    dispatch({ type: "ADD_TO_CART", payload });
  }

  function removeFromCart(payload) {
    dispatch({ type: "REMOVE", payload });
  }

  function clearCart(payload) {
    dispatch({ type: "CLEAR_CART" });
  }

  const cartActions = {
    increment,
    decrement,
    addToCart,
    removeFromCart,
    clearCart,
    ...state,
  };

  return (
    <ShopContext.Provider value={cartActions}>{children}</ShopContext.Provider>
  );
};
