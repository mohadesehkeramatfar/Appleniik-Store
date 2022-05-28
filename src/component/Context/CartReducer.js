const cartReducer = (state, actions) => {
  switch (actions.type) {
    case "addToCart":
      const cart = [...state.cartList];
      const indexItem = cart.findIndex((itm) => itm.id === actions.itm.id);
      if (indexItem < 0) {
        cart.push({
          ...actions.itm,
          amountRequired: actions.amountRequired,
          check: false,
        });
        localStorage.setItem("selectedProducts", JSON.stringify(cart));
        localStorage.setItem(
          "totalCount",
          JSON.stringify(state.totalCount + actions.amountRequired)
        );
        localStorage.setItem(
          "totalPrice",
          JSON.stringify(state.totalPrice + actions.itm.price)
        );
        cart.check = false;
        return {
          ...state,
          cartList: cart,
          totalCount: actions.amountRequired + state.totalCount,
          totalPrice: actions.itm.price + state.totalPrice,
          warning: cart.check,
        };
      } else if (
        cart[indexItem].amountRequired < actions.itm.stockSelectedProduct
      ) {
        const updateItem = { ...cart[indexItem] };
        updateItem.check = false;
        updateItem.amountRequired++;
        cart[indexItem] = updateItem;
        localStorage.setItem("selectedProducts", JSON.stringify(cart));

        localStorage.setItem(
          "totalCount",
          JSON.stringify(state.totalCount + actions.amountRequired)
        );
        localStorage.setItem(
          "totalPrice",
          JSON.stringify(state.totalPrice + actions.itm.price)
        );
        updateItem.check = false;
        return {
          ...state,
          cartList: cart,
          totalCount: actions.amountRequired + state.totalCount,
          totalPrice: actions.itm.price + state.totalPrice,
          warning: updateItem.check,
        };
      } else {
        // state.warning = "متاسفانه تعداد درخواستی شما بیشتر از موجودی انبار است";
        const trueWarning = true;
        const updateItem = { ...cart[indexItem] };
        updateItem.check = true;
        cart[indexItem] = updateItem;

        return {
          ...state,
          cartList: cart,
          warning: updateItem.check,
        };
      }

    case "decrement":
      const cartDec = [...state.cartList];
      const indexItemDec = cartDec.findIndex(
        (itm) => itm.id === actions.itm.id
      );
      const updateditemDec = { ...cartDec[indexItemDec] };
      if (updateditemDec.amountRequired === 1) {
        const filteredItem = cartDec.filter((itm) => itm.id !== actions.itm.id);
        localStorage.setItem("selectedProducts", JSON.stringify(filteredItem));
        localStorage.setItem(
          "totalCount",
          JSON.stringify(state.totalCount - actions.amountRequired)
        );
        localStorage.setItem(
          "totalPrice",
          JSON.stringify(state.totalPrice - actions.itm.price)
        );
        return {
          ...state,
          cartList: filteredItem,
          totalCount: state.totalCount - actions.amountRequired,
          totalPrice: state.totalPrice - actions.itm.price,
        };
      } else {
        updateditemDec.amountRequired--;
        cartDec[indexItemDec] = updateditemDec;
        localStorage.setItem("selectedProducts", JSON.stringify(cartDec));
        localStorage.setItem(
          "totalCount",
          JSON.stringify(state.totalCount + actions.amountRequired)
        );
        localStorage.setItem(
          "totalPrice",
          JSON.stringify(state.totalPrice + actions.itm.price)
        );
        return {
          ...state,
          cartList: cartDec,
          totalCount: state.totalCount - actions.amountRequired,
          totalPrice: state.totalPrice - actions.itm.price,
        };
      }

    case "delete":
      const cartDel = [...state.cartList];
      const indexItemDel = cartDel.findIndex(
        (itm) => itm.id === actions.itm.id
      );
      const updateditemDeleted = { ...cartDel[indexItemDel] };
      const filteredItem = cartDel.filter((itm) => itm.id !== actions.itm.id);
      localStorage.setItem("selectedProducts", JSON.stringify(filteredItem));
      localStorage.setItem(
        "totalCount",
        JSON.stringify(state.totalCount - updateditemDeleted.amountRequired)
      );
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(
          state.totalPrice -
            updateditemDeleted.price * updateditemDeleted.amountRequired
        )
      );
      return {
        ...state,
        cartList: filteredItem,
        totalCount: state.totalCount - updateditemDeleted.amountRequired,
        totalPrice:
          state.totalPrice -
          updateditemDeleted.price * updateditemDeleted.amountRequired,
      };

    case "LocalStorage":
      const lsselectedProducts = JSON.parse(
        localStorage.getItem("selectedProducts")
      );
      const lsToatalCount = JSON.parse(localStorage.getItem("totalCount"));
      const lsTotalPrice = JSON.parse(localStorage.getItem("totalPrice"));
      if (
        lsselectedProducts === null ||
        lsToatalCount === null ||
        lsTotalPrice === null
      ) {
        localStorage.setItem("selectedProducts", JSON.stringify([]));
        const xx = JSON.parse(localStorage.getItem("selectedProducts"));
        localStorage.setItem("totalCount", JSON.stringify(0));
        const yy = JSON.parse(localStorage.getItem("totalCount"));
        localStorage.setItem("totalPrice", JSON.stringify(0));
        const zz = JSON.parse(localStorage.getItem("totalPrice"));
        return {
          ...state,
          cartList: xx,
          totalCount: yy,
          totalPrice: zz,
        };
      } else {
        const lsSP = JSON.parse(localStorage.getItem("selectedProducts"));
        const lsTC = JSON.parse(localStorage.getItem("totalCount"));
        const lsTP = JSON.parse(localStorage.getItem("totalPrice"));
        return {
          ...state,
          cartList: lsSP,
          totalCount: lsTC,
          totalPrice: lsTP,
        };
      }

    default:
      break;
  }
};

export default cartReducer;
