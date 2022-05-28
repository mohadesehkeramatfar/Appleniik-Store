import { createContext, useContext, useEffect, useState } from "react";

const AuthUserContext = createContext();
const AuthUserDispatchContext = createContext();

const AuthUserProvider = ({ children }) => {
  const [infoUser, dispatch] = useState(false);

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("AuthUser")) || false;
    dispatch(ls);
  }, []);

  
  return (
    <AuthUserContext.Provider value={infoUser}>
      <AuthUserDispatchContext.Provider value={dispatch}>
        {children}
      </AuthUserDispatchContext.Provider>
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;

export const useAuthUser = () => useContext(AuthUserContext);
export const useAuthUserActions = () => useContext(AuthUserDispatchContext);
