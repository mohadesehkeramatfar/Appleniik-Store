
const AuthUserReducer =(state,actions)=>{

    switch (actions.type) {
        case "GetFromLS":
             const lS =  JSON.parse(localStorage.getItem("AuthUser")) 
            return{
                infoUser:lS
            }
    
        default:
            break;
    }

}