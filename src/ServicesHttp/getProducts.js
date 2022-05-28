import { http } from "./BaseURL";

export default function GetProducts() {
  return http.get("/product");
}
