import React from 'react'
import { Link } from 'react-router-dom'
import { FaEthereum } from 'react-icons/fa';
import './header.css'


const Header = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <h1>Cryptoverse</h1>
            <FaEthereum/>
        </div>
        <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/coins'>Coins</Link></li>    
        </ul> 
      
    </div>
  )
}

export default Header
