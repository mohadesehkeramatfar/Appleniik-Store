import { createContext, useContext, useReducer, useState } from "react";
import closeBoxReducer from "./CloseBoxReducer";

const CloseBox = createContext();
const CloseBoxDispatch = createContext();

const initialValues ={
    userMenu: false,
};

const CloseBoxProvider = ({ children }) => {
  const [closeBox, setCloseBox] = useReducer(closeBoxReducer,initialValues);

  return (
    <CloseBox.Provider value={closeBox}>
      <CloseBoxDispatch.Provider value={setCloseBox}>
        {children}
      </CloseBoxDispatch.Provider>
    </CloseBox.Provider>
  );
};

export default CloseBoxProvider;

export const useCloseBox = () => useContext(CloseBox);
export const useCloseBoxActions = () => useContext(CloseBoxDispatch);
