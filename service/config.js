
import axios from "axios";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: "https://store.go-clothes.uz/v1",
});

async function refreshAccessToken() {
  try {
    const refresh = Cookies.get("refresh_token");
    if (!refresh) {
      throw new Error("Refresh token not found.");
    }
    const response = await axios.get(
      `https://store.go-clothes.uz/v1/token/${refresh}`
    );
    const { access_token, refresh_token } = response.data;
    Cookies.set("access_token", access_token, {
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("refresh_token", refresh_token, {
      secure: true,
      sameSite: "Strict",
    });
    return access_token;
  } catch (error) {
    console.log(error);
  }
}

http.interceptors.request.use((config) => {
  const access_token = Cookies.get("access_token");
  if (access_token) {
    config.headers["Authorization"] = access_token;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccessToken();
      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = access_token;
        return axios(originalRequest); // Retry the original request
      } else {
        console.error(
          "Failed to refresh access token. Redirecting to login page..."
        );
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default http;
