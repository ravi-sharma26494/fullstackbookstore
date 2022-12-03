import React, {useState} from 'react'
import { Link, Navigate, redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Registration = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const navigate = useNavigate();
    const submitHandler = async(e)=>{
        e.preventDefault();
        // navigate('/login')
        const response  = await axios.post('http://localhost:5000/registration',{
            username:userName,
            password:password,
            confirmpassword:confirmpassword
        })
        .then((data)=> {
            if(data.data.message = 'User Already Exists'){
                alert('User Already exixts: Login To continue');
            }
        })
        .catch(err=> console.log(err))
        if(response.data.data.message="User Already Exists"){
            alert('Already Registered login to continue');
            navigate('/login')
        }
        
    }
  return (
    <div className='container'>
    <div className='card'>

    <form onSubmit={submitHandler} method="post">
                
    <div className='login-header card-items'>
        <h1>Register</h1>
    </div>

    <div className='login-username card-items'>
        <input type="text" name="username" id="username" placeholder="USERNAME" onChange={(e)=>setUserName(e.target.value)}/>
    </div>

    <div className='login-password card-items'>
        <input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
    </div>

    <div className='confirm-password card-items'>
        <input type="text" name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" onChange={(e)=>setConfirmpassword(e.target.value)}/>
    </div>

    <div className='login-button card-items'>
        <button type="submit" name="submit" id="submit" >LOGIN</button>
    </div>
    <div className='redirection card-items'>
        <Link to={`/login`}>Already Have an Account ?</Link>
    </div>
    </form>
    </div>

</div>
  )
}
export default Registration