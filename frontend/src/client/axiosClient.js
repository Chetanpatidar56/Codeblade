// import axios from "axios";
// const axiosClient=axios.create({
//     baseURL:'https://codeblade.onrender.com',
//     withCredentials:true,
//     headers:{
//         'Content-Type':'application/json'
//     }
// });
// export default axiosClient;
import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://codeblade.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
});

// Add interceptor to ensure cache headers on every request
axiosClient.interceptors.request.use(
  (config) => {
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
