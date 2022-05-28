const guardProductReducer = (state, actions) => {
  switch (actions.type) {
    case "SearchResult":
      const product = [...state.products];
 
      if (actions.value === "") {
        return {
          ...state,
          // products:product,
          products: product,
        };
      } else {
        const searchResult = product.filter((itm) =>
          itm.title.includes(actions.value)
        );
        
          return {
            ...state,
            // products:product
            products: searchResult,
          };
      
      }

    default:
      break;
  }
};
export default guardProductReducer;
