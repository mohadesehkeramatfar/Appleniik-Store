import { Action } from "history";

const closeBoxReducer = (state, action) => {
  switch (action.type) {
    case "notColseUserBox":
      state.userMenu = !state.userMenu;
      return {
        userMenu: state.userMenu,
      };

    case "ColseUserBox":
     state.userMenu = false
     return{
         userMenu:state.userMenu
     }

    default:
      break;
  }
};
export default closeBoxReducer;
