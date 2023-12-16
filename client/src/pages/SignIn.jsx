import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signInStart, signInSuccess, signFailure } from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux'

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/sing-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await res.json()
      
      if (data.success == false) {
        dispatch(signFailure(data.message))
        return
      }
      console.log(data);
      dispatch(signInSuccess(data))

      navigate('/')
    } catch (error) {
      dispatch(signFailure(error))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing Ip</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' id='email' onChange={handleChange} className='p-3 bg-slate-100 rounded-lg' />
        <input type="password" placeholder='password' id='password' onChange={handleChange} className='p-3 bg-slate-100 rounded-lg' />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-75 disabled:opacity-80 uppercase'>{loading ? 'Loading...' : 'sing in'}</button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sing-up">
          <span className='text-blue-500'>Sing up</span>
        </Link>
      </div>
      <p className='text-red-700 font-medium mt-5'>{error ? error.message || 'Shomething went wrong' : ''}</p>
    </div>
  )
}
