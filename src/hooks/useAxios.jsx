import axios from "axios";
import UseAuth from "./UseAuth";
export default function useAxios() {
const {user} = UseAuth(); 
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});
axiosSecure.interceptors.request.use((config)=>{
  config.headers.authorization = `Bearer ${user?.accessToken}`;
  return config;
}),error => {
  return Promise.reject(error)
}
  return axiosSecure;
}
