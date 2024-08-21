import Instance from '../api/axiosInstance'
import jwt_decode from 'jwt-decode'

export const setToken =(token)=>{
    localStorage.setItem('token',token)

}

export const getToken=()=>{
    const token=localStorage.getItem('token');
    if (token){
        return token;

    } return null
}

export const login =(userData)=>{
    Instance.post('api/v1/auth/login',userData)
};
export const getUserEmail =()=>{
    const token =getToken();
    if (token){
        const payload= jwt_decode(token)
        return payload.email
    }return null
}
export const getUserRole =()=>{
    const token =getToken();
    if (token){
        const payload= jwt_decode(token)
        return payload.role
    }return null
}

export const isLoggedIn =()=>{
    const token= getToken()

    if (token){
        const payload=jwt_decode(token)
        const isLogin =Date.now()< payload.exp *1000;
        return isLogin;
    }
}

module.exports={getToken,setToken,login,getUserEmail,getUserRole,isLoggedIn}