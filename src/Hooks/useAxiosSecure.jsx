import axios from "axios";
import useAuth from "./useAuth";

 
const instance = axios.create({
   baseURL: 'http://localhost:3000'
})

const useAxiosSecure =()=>{
  
  const { user }= useAuth()

  // set token in the header all the api call using axiosSecure hook
  instance.interceptors.request.use((config)=>{
    console.log(config)
    // token patano
     config.headers.authorization = `Bearer ${user.accessToken}`
    return config;
  })

   return instance
}

export default useAxiosSecure;