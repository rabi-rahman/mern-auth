import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SignIn() {
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  }

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await axios.post('http://localhost:3000/api/auth/signin', formData);
      console.log(res.data);
      setLoading(false);
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error)
    }
  };
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60'>{loading?'Loading...':'Sign in'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5' >{error && 'Something went wrong'}</p>
    </div>
  )
}
