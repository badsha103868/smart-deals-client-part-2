import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

 
const instance = axios.create({
   baseURL: 'http://localhost:3000'
})

const useAxiosSecure =()=>{
  
  const { user, signOutUser }= useAuth()
  const navigate = useNavigate()

  // set token in the header all the api call using axiosSecure hook
  
 useEffect(()=>{
  // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config)=>{
    console.log(config)
    // token patano
     config.headers.authorization = `Bearer ${user.accessToken}`
    return config;
  })
      
  // response interceptor
  const responseInterceptor =   instance.interceptors.response.use(res =>{
    return res;
  },
 err=>{
  // console.log('error inside the interceptor', err);
  const status = err.status;
  if(status === 401 || status === 403){
    console.log('log out the user for bad request')
    signOutUser()
    .then(()=>{
      // navigate user to the log in page
        navigate('/register')
    })
  }

 })

   return ()=>{
    instance.interceptors.request.eject(requestInterceptor)
    instance.interceptors.response.eject(responseInterceptor)
   }
 },[user, signOutUser, navigate])

   return instance
}

export default useAxiosSecure;