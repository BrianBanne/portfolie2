import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

const initialState = {
  cart: [],
};

if (localStorage.getItem("user")) {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    //check if expired??
    initialState.user = user
    
  } catch (error) {
    console.error(error);
  }
}


/* const cookies = new Cookies();

if (cookies.get(TOKEN_NAME) !== null) {
  try {
    const user = jwtDecode(cookies.get(TOKEN_NAME));

    if (user.exp * 10 00 < Date.now()) {
      cookies.set(TOKEN_NAME, null);
    } else {
      initialState.user = user;
    }
  } catch (err) {
    console.log(err);
  }
} */

export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100) // fake async
    }
  }

const AuthContext = createContext({
  user: null,
  logout: () => {},
  loginUser: () => {},
  loginAdmin: () => {}
});

function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const history = useHistory();

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    history.push("/user");

    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const loginAdmin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    history.push("/admin");

    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    history.push("/login");
    localStorage.removeItem("user")
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loginUser,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export const AuthConsumer = AuthContext.Consumer;
