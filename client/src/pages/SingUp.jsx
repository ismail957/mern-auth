import { useState } from 'react'
import {Link} from 'react-router-dom'

export default function SingUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      const res = await fetch('/api/auth/sing-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await res.json()
      
      setLoading(false)
      
      if (data.success == false) {
        setError(true)
        return
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
    
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='username' id='username' onChange={handleChange} className='p-3 bg-slate-100 rounded-lg' />
        <input type="email" placeholder='email' id='email' onChange={handleChange} className='p-3 bg-slate-100 rounded-lg' />
        <input type="password" placeholder='password' id='password' onChange={handleChange} className='p-3 bg-slate-100 rounded-lg' />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-75 disabled:opacity-80 uppercase'>{loading ? 'Loading...' : 'sing up'}</button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sing-in">
          <span className='text-blue-500'>Sing in</span>
        </Link>
      </div>
      <p className='text-red-700 font-medium mt-5'>{error && 'Shomething went wrong'}</p>
    </div>
  )
}
