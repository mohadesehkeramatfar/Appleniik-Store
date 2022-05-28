import { http } from "./BaseURL";


export default function RegUser(infoUser){
    return http.post("/user/register",infoUser)
} 