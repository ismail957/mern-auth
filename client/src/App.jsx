import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-row place-content-around">
        <Link to={'/'}>home</Link>
        <Link to={'/about'}>about</Link>
        <Link to={'/singin'}>Singin</Link>
        <Link to={'/Singup'}>Singup</Link>
      </div>

      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/singin' element={<SingIn />} />
          <Route path='/singup' element={<SingUp />} />
      </Routes>
    </BrowserRouter>
  )
}
