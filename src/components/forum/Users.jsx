import {useState,useEffect} from 'react'
import axios from 'axios'

const Users = () => {

    const [user, setUser]=useState()
    useEffect(() => {
           const  response = async ()=>{
             try {
            const request=await axios.get('')
             } catch () {

             }
           }

        return () => {
            effect
        };
    }, [input])

  return (
    <div>Users</div>
  )
}

export default Users