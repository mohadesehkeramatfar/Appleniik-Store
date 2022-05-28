import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import cartReducer from "./CartReducer";

const CartContext = createContext();
const CartContextDispatch = createContext();

const initialValues = {
  cartList: [],
  totalCount: 0,
  totalPrice: 0,
  warning: false,
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialValues);

  return (
    <CartContext.Provider value={cart}>
      <CartContextDispatch.Provider value={dispatch}>
        {children}
      </CartContextDispatch.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
export const useCartActions = () => useContext(CartContextDispatch);
