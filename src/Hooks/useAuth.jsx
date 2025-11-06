import { use } from "react";
import { AuthContext } from "../Context/AuthContexts";

const useAuth =()=>{
 const authInfo = use(AuthContext)
 return authInfo;
}

export default useAuth;