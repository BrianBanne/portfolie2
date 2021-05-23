import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

const initialState = {
  token: "",
  user: {
    email: "",
    type: "",
  },
};

if (localStorage.getItem("session")) {
  try {
    const session = JSON.parse(localStorage.getItem("session"));
    //future: check if expired
    initialState.token = session.token;
    initialState.user.type = session.type;
    initialState.user.email = session.email;
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
      localStorage.setItem("session", JSON.stringify(action.payload));
      return {
        ...state,
        token: action.payload.token,
        user: { type: action.payload.type, email: action.payload.email },
      };
    case "LOGOUT":
      localStorage.removeItem("session");
      return { ...state, token: null, user: null };
    default:
      return state;
  }
}
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const history = useHistory();

  const loginUser = (token, email) => {
    dispatch({
      type: "LOGIN",
      payload: { token: token, type: "USER", email: email },
    });
    history.push("/user");
  };

  const loginAdmin = (data) => {
    dispatch({
      type: "LOGIN",
      payload: { token: data.token, type: "ADMIN", email: data.user.email },
    });
    history.push("/admin");
  };

  const logout = () => {
    history.push("/login");
    localStorage.removeItem("session");
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
