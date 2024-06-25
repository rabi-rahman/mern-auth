import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error)
    }
  };
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60'>{loading?'Loading...':'Sign up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5' >{error && 'Something went wrong'}</p>
    </div>
  )
}
