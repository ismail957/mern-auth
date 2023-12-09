import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
      {/* Header */}
      <Header />

      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sing-in' element={<SingIn />} />
          <Route path='/sing-up' element={<SingUp />} />
      </Routes>
    </BrowserRouter>
  )
}
