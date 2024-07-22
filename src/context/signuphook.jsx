import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import axios from 'axios'
export const useSignup =()=>{
    const [error, setError] = useState(null)
    const [isloading,setIsloadind] =useState(null)


    const signUp=async(email,password)=>{
        setIsloading(true)
        setError(null)

        const response= await axios.post()

    }
}

