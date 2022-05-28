import { http } from "./BaseURL";

export default function LoginUser(values){
    return http.post("/user/login",values)
}