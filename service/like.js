import http from "./config";
const like = {
  get: () => http.get("/wishlist", { params: { page: 1, limit: 10 } }),
  postLike: (id) => http.post(`/like/${id}`),
  unLike: (id) => http.post(`/unlike/${id}`),
};

export default like;
