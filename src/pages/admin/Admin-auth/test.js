import axios from 'axios';

const registerUser=async(fullName, username,email,password)=>{
    try{
        const response=await axios.post(
            'https://scentreel-be.onrender.com/api/v1/admins/register',
            {fullName, username,email,password},
            {
                headers:{'content-Type' : 'application/json'},
                withCredentials: true,
            }
        );
        console.log(response.data);
    }catch(error){
        console.error('error registering user', error)
    }
}
registerUser('max maxwell','nerdy max','nerdymax84@gmail.com', 'pass1234')