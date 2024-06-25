import Register from './Register'

   

const Login = () => {
  return (
    <div>
    <Register />


    </div>
  )
}

export default Login


















































// import { useState, useEffect, useRef } from "react";
// import axios from 'axios'
// const Login = () => {
//   // state declaration
//   const [user, setUser] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLogin, isNotLogin] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [isLoading, isNotLoading] = useState(false);

//   useEffect(() => {
//     setErrMsg("");
//   }, [email, password]);

//   // useEffect(() => {
//   // useRef.current.focus
//   // }, [])

// const url = "https://scentreel-be.onrender.com/api/v1/auth/login/";

// const payload={
//     email:email,
//     password:password
// }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//        const response= await axios.post(url,payload,{headers:{'Content-Type': 'application/json'}})

//         console.log(response)
//     } catch (error) {
//        console.error(error.response.data)
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div>
//           {" "}
//           <h1>Sign in</h1>
//           <div className="flex gap-2 ml-9 ">
//             <label htmlFor="email" className="flex">
//               <h4></h4>
//             </label>

//             <div className="flex gap-2">
//               email
//               <input
//                 type="text"
//                 value={email}
//                 autoComplete="on"
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="flex w-full rounded    px-6 py-4 border border-black h-7"
//               />
//             </div>
//           </div>
//           <div className="flex p-4 gap-2">
//             <label htmlFor="password">
//               <h4>password</h4>
//             </label>
//             <input
//               type="password"
//               value={password}
//               autoComplete="on"
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//               required
//               className=" w-[] rounded pl-2 px-2 py-2 border border-black h-7"
//             />
//           </div>
//         </div>

//         <div className="w-full">
//           <button
//             type="submit"
//             className="align-middle border border-amber-950 w-[6rem] rounded justify-center ml-[32%]"
//             onClick={handleSubmit}
//           >
//             Sign in
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
