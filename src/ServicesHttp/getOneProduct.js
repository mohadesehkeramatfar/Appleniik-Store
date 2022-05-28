import { http } from "./BaseURL";

export default function GetOneProduct(id) {
  return http.get(`/product/${id}`);
}
