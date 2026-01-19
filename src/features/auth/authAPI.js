import axiosClient from "../../api/axiosClient";

export const authAPI = {
  login: (username, password) =>
    axiosClient.post("/user/login", { username, password }),

  refreshToken: (refreshToken) =>
    axiosClient.post("/user/refresh", { refreshToken }),

  logout: (refreshToken) =>
    axiosClient.post(`/user/refresh?refreshToken=${refreshToken}`),
};
