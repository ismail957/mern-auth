import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-200">
        <div className="flex justify-between items-center max-w-6xl m-auto p-3">
        
        <Link to={'/'}><h1 className="font-bold">Auth App</h1></Link>
        <ul className="flex gap-4">
            <li><Link to={'/'}>home</Link></li>
            <li><Link to={'/about'}>about</Link></li>
            <li><Link to={'/sign-in'}>Sign In</Link></li>
            <li><Link to={'/Sign-up'}>Sign Up</Link></li>
        </ul>
        </div>
    </div>
  )
}
