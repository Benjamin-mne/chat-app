import './navbar.css'

//Firebase
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='navbar'>
        <span className="navbar__logo">Chat App</span>
        <div className="navbar__user">
            <img src={currentUser?.photoURL} alt="" />
            <span>{ currentUser?.displayName}</span>
        </div>
    </div>
  )
}
