import { createContext, useReducer } from "react";

export const ShopContext = createContext();

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const discountStorage = localStorage.getItem("discount")
  ? JSON.parse(localStorage.getItem("discount"))
  : false;

const initialState = {
  cart: storage,
  activeDiscount: discountStorage,
};

function setLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart.length > 0 ? cart : []));
}

function getCartIdx(state, action) {
  return state.cart.findIndex((product) => product._id === action.payload._id);
}
const ShopReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const cartItemIdx = getCartIdx(state, action);
      console.log(cartItemIdx);
      if (cartItemIdx < 0) {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
        return {
          ...state,
          cart: state.cart,
          ...setLocalStorage(state.cart),
        };
      } else {
        const newCart = [
          ...state.cart.slice(0, cartItemIdx),
          {
            ...state.cart[cartItemIdx],
            quantity: state.cart[cartItemIdx].quantity + 1,
          },
          ...state.cart.slice(cartItemIdx + 1),
        ];
        return {
          ...state,
          cart: newCart,
          ...setLocalStorage(state.cart),
        };
      }
    case "INCREMENT":
      const cartItemId = getCartIdx(state, action);

      const newCart = [
        ...state.cart.slice(0, cartItemId),
        {
          ...state.cart[cartItemId],
          quantity: state.cart[cartItemId].quantity + 1,
        },
        ...state.cart.slice(cartItemId + 1),
      ];
      return {
        ...state,
        cart: newCart,
        ...setLocalStorage(state.cart),
      };

    case "DECREMENT":
      const cartItemI = getCartIdx(state, action);
      if (state.cart[cartItemI].quantity > 1) {
        const newCart = [
          ...state.cart.slice(0, cartItemI),
          {
            ...state.cart[cartItemI],
            quantity: state.cart[cartItemI].quantity - 1,
          },
          ...state.cart.slice(cartItemI + 1),
        ];
        return {
          ...state,
          cart: newCart,
          ...setLocalStorage(state.cart),
        };
      } else
        return {
          ...state,
          cart: [...state.cart],
          ...setLocalStorage(state.cart),
        };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter(({ _id }) => _id !== action.payload._id),
        ...setLocalStorage(state.cart),
      };
    case "CLEAR_CART":
      localStorage.removeItem("popupIsShown");
      return {
        ...state,
        cart: [],
        ...setLocalStorage([]),
        ...localStorage.removeItem("discount", true),
      };
    case "ACTIVATE_DISCOUNT":
      return {
        ...state,
        activeDiscount: true,
        ...localStorage.setItem("discount", true),
      };

    default:
      return { state };
  }
};

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShopReducer, initialState);

  function increment(payload) {
    dispatch({ type: "INCREMENT", payload });
  }

  function decrement(payload) {
    dispatch({ type: "DECREMENT", payload });
  }

  function addToCart(payload) {
    dispatch({ type: "ADD_TO_CART", payload });
  }

  function removeFromCart(payload) {
    dispatch({ type: "REMOVE", payload });
  }

  function clearCart(payload) {
    dispatch({ type: "CLEAR_CART" });
  }

  function setDiscount(payload) {
    dispatch({ type: "ACTIVATE_DISCOUNT", payload });
  }

  const cartActions = {
    increment,
    decrement,
    addToCart,
    removeFromCart,
    clearCart,
    setDiscount,
    ...state,
  };

  return (
    <ShopContext.Provider value={cartActions}>{children}</ShopContext.Provider>
  );
};
