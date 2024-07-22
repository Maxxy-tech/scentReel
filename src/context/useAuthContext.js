import {useContext} from 'react'
import {AuthContext} from './authContext'

export const useAuthContext =()=>{
    const context= useContext(AuthContext)

    if (!context){
        throw Error ('auth context must be used inside the authcontext provider')
    }
    return context
}