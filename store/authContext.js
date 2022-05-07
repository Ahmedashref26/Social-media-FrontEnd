import { createContext, useReducer } from 'react';
import AuthReducer from './authReducer';

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const contextState = {
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    dispatch,
  };

  return (
    <AuthContext.Provider value={contextState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
