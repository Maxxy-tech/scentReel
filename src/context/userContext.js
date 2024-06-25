import {createContext,useContext} from 'react'

export const userContext=createContext({
    user:null,
    login: ()=>{},
    logout:()=>{}
})
const USER={
    name:"Guest",isGuestUser:true
};

export function userContext.Provider({children}){
    const [user, setUser] = useState()
    return <userContext.Provider value={{}}>{children}</userContext.Provider>
}