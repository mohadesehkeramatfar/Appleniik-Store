const favoritesRaducer = (state, actions) => {
  switch (actions.type) {
    case "AddToFavorite":
      const favorites = [...state.favoriteList];
      const indexItem = favorites.findIndex(
        (itm) => itm._id === actions.itms._id
      );

      if (indexItem < 0) {
        favorites.push({ ...actions.itms, flagFav: true });
        localStorage.setItem("FavoritesList", JSON.stringify(favorites));
        localStorage.setItem(
          "CountFavoritesList",
          JSON.stringify(state.count + 1)
        );
        return {
          ...state,
          favoriteList: favorites,
          count: state.count + 1,
        };
      } else {
        const indexOfitem = favorites.indexOf(
          (itm) => itm._id === actions.itms._id
        );
        favorites.splice(indexOfitem);

        localStorage.setItem("FavoritesList", JSON.stringify(favorites));
        localStorage.setItem(
          "CountFavoritesList",
          JSON.stringify(state.count - 1)
        );
        return {
          ...state,
          favoriteList: favorites,
          count: state.count - 1,
        };
      }

    case "RemoveFromFavorite":
      const favoritesRemove = [...state.favoriteList];
      const filteredItem = favoritesRemove.filter(
        (itm) => itm._id !== actions.itms._id
      );

      localStorage.setItem("FavoritesList", JSON.stringify(filteredItem));
      localStorage.setItem(
        "CountFavoritesList",
        JSON.stringify(state.count - 1)
      );
      return {
        ...state,
        favoriteList: filteredItem,
        count: state.count - 1,
      };

    case "GetFromLS":
      const getLSFavoritesList = JSON.parse(
        localStorage.getItem("FavoritesList")
      );
      if (getLSFavoritesList == null) {
        localStorage.setItem("FavoritesList", JSON.stringify([]));
        localStorage.setItem("CountFavoritesList", JSON.stringify(0));
        const getLSFavoritesList = JSON.parse(
          localStorage.getItem("FavoritesList")
        );
        const getLSCountFavoritesList = JSON.parse(
          localStorage.getItem("CountFavoritesList")
        );
        return {
          ...state,
          favoriteList: getLSFavoritesList,
          count: getLSCountFavoritesList,
        };
      } else {
        const getLS = JSON.parse(localStorage.getItem("FavoritesList"));
        const getLSCount = JSON.parse(
          localStorage.getItem("CountFavoritesList")
        );
        return {
          ...state,
          favoriteList: getLS,
          count: getLSCount,
        };
      }

    default:
      break;
  }
};

export default favoritesRaducer;
