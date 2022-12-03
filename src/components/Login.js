import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Styles.css'

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const submitHandler = async(e)=>{
        e.preventDefault();
        const response  = await axios.post('http://localhost:5000/login',{
            username:userName,
            password:password,
        })
        .then((data)=> {
            // localStorage.setItem('token',data.token)
            console.log(data);
        })
        .catch(err=> console.log(err))
        
    }
  return (
    <div className='container'>
        <div className='card'>
            <form onSubmit={submitHandler} method="post">
            <div className='login-header card-items'>
            <h1>Member Login</h1>
        </div>

        <div className='login-username card-items'>
            <input type="text" name="username" id="username" placeholder="USERNAME" onChange={(e)=>setUserName(e.target.value)}/>
        </div>

        <div className='login-password card-items'>
            <input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        <div className='login-button card-items'>
            <button type="submit" name="submit" id="submit" >LOGIN</button>
        </div>
        <div className='redirection card-items'>
            <Link to={`/registration`}>Dont Have an Account? Register Here</Link>
        </div>
            </form>
        
        
        </div>

    </div>
  )
}

export default Login