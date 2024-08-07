import http from "./config";

const Comment = {
  get: (id, page = 1, limit = 100) =>
    http.get(`/product-comments`, { params: { id, page, limit } }),
  create: (commentData) => http.post(`/comment`, commentData),
};

export default Comment;
