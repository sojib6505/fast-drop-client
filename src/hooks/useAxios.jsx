import axios from "axios";
export default function useAxios() {
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});
  return axiosSecure;
}
