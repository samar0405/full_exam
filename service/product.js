import http from "./config";

const product = {
 
  get: () => http.get("/products", { params: { page: 1, limit: 500 } }),
  single: (id) => http.get(`/product/${id}`),
};

export default product;
