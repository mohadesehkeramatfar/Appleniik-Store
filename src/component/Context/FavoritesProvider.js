import { initial } from "lodash";
import { createContext, useContext, useReducer, useState } from "react";
import favoritesRaducer from "./favoritesRaducer";

const FavoritesContext = createContext();
const FavoritesContextDispatch = createContext();
 
const initialValues = {
  favoriteList: [],
  count:0,

};

const FavoritesProvider = ({ children }) => {
  const [favorite, setFavorite] = useReducer(favoritesRaducer, initialValues);

  return (
    <FavoritesContext.Provider value={favorite}>
      <FavoritesContextDispatch.Provider value={setFavorite}>
        {children}
      </FavoritesContextDispatch.Provider>
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;

export const useFavorites = () => useContext(FavoritesContext);
export const useFavoritesActions = () => useContext(FavoritesContextDispatch);
