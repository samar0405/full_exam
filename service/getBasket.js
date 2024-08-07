import http from "./config";
const getBasket = {
  get: () => http.get("/user-baskets"),
  post: (product) => http.post(`/basket`, product),
};

export default getBasket;
