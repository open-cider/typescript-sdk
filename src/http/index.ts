import axios from "axios";  
import config from '../../config.json';


const instance = axios.create({  
  baseURL: config.request.base_url,  
  headers: { 'Content-type' : 'application/json' }
});

instance.interceptors.response.use(
  function(response) { return response; }, 
  function (error) {
    if (error.response) {
      return error.response;
    } else return Promise.reject(error);
  }
);

/* Export http instance and helper functions */
export const http      = instance;
export const isSuccess = (status: number) => {
  return (status >= 200 && status <= 202)
}