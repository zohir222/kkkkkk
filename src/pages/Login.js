import React from 'react'
import axios from 'axios';
import  {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Helper/AuthContext';
import { useContext } from 'react';

function Login() {

    const [name , setName] = useState("");
    const [passWord , setPassWord] = useState("");

    const navigate = useNavigate();

    const {setAuthstate} = useContext(AuthContext);

    const submit = ()=>{
        const data = {userName : name , passWord : passWord}
        axios.post("http://localhost:3001/Users/Login" , data).then( (responce)=> {
        if (responce.data.error){
            alert(responce.data.error)
        }
        else{
            localStorage.setItem("accessToken" , responce.data.token);
            setAuthstate({userName : responce.data.username , id : responce.data.id , status : true})
            alert("Succefullt Logged in .....! ")
        }
        navigate("/");
        } )
    }
  
    
  return (
    <div className='Login'>
     <h3>Welcom user </h3>
     <div >
        <label>User Name : <input type="text" onChange = {(e)=> setName(e.target.value)} /> </label>
        <label>PassWord : <input type="text"  onChange = {(e)=> setPassWord(e.target.value)}  /> </label>
        <button type="submit" onClick={submit} >Submit the form</button>
     </div>
    </div>
  )
}

export default Login