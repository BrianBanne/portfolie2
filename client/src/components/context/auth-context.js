import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

const initialState = {
  token: "",
  user: {
    email: "",
    type: "",
  },
};

if (localStorage.getItem("token")) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    //check if expired??
    initialState.token = token;
  } catch (error) {
    console.error(error);
  }
}

const AuthContext = createContext({
  token: null,
  user: null,
  logout: () => {},
  loginUser: () => {},
  loginAdmin: () => {},
});

function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        token: action.payload.token,
        user: { type: action.payload.type, email: action.payload.email },
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, token: null, user: null };
    default:
      return state;
  }
}
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const history = useHistory();

  const loginUser = (token, email) => {
    console.log(token, email);
    dispatch({
      type: "LOGIN",
      payload: { token: token, type: "USER", email: email },
    });
    history.push("/user");
  };

  const loginAdmin = (token) => {
    dispatch({
      type: "LOGIN",
      payload: { token: token, type: "ADMIN" },
    });
  };

  const logout = () => {
    history.push("/login");
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
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
