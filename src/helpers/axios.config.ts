import axios from "axios";

const axiosApiInstance = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

axiosApiInstance.interceptors.request.use(
  async config => config,
  error => Promise.reject(error),
);

axiosApiInstance.interceptors.response.use(
  response => response,
  async error => await Promise.reject(error.response)
);

export default axiosApiInstance;
