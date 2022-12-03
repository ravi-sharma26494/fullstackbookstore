import React, {useEffect} from 'react'
import jwt from 'jsonwebtoken'
import { Navigate, useNavigate } from 'react-router-dom'

const Protected = () => {
    const naviagte =useNavigate();
    async function populateSomething(){
        const req = await fetch ('api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })
        const data = res.json()
        console.log(data);
    }
useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
        const user = jwt.decode(token)
        console.log(user);
    } if(!user){
        localStorage.removeItem('token')
        naviagte.replace('/login')
    } else{
        populateSomething()
    }
},[])

useEffect()
  return (
    <div>Hello Protected</div>
  )
}

export default Protected