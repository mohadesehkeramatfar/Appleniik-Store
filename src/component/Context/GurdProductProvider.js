import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import GetProducts from "../../ServicesHttp/getProducts";
import guardProductReducer from "./GuardProductReducer";

const ProductContext = createContext();
const ProductsetProduct = createContext();

const CopyOfProductsContext = createContext();
const SetCopyOfProductsContext = createContext();

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [copyProduct, setCopyProduct] = useState([]);

  useEffect(() => {
    GetProducts()
      .then((res) => {
        setProduct(res.data);
        setCopyProduct(res.data);
      })
      .catch();
  }, []);

  return (
    <ProductContext.Provider value={product}>
      <CopyOfProductsContext.Provider value={copyProduct}>
        <ProductsetProduct.Provider value={setProduct}>
          <SetCopyOfProductsContext.Provider value={setCopyProduct}>
            {children}
          </SetCopyOfProductsContext.Provider>
        </ProductsetProduct.Provider>
      </CopyOfProductsContext.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProduct = () => useContext(ProductContext);
export const useProductActions = () => useContext(ProductsetProduct);

export const useCopyProduct = () => useContext(CopyOfProductsContext);
export const useCopyProductActions = () => useContext(SetCopyOfProductsContext);
