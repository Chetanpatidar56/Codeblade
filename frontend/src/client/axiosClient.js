import axios from "axios";
const axiosClient=axios.create({
    baseURL:'https://codeblade.onrender.com',
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
});
export default axiosClient;