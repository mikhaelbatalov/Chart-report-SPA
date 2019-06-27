import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'

const Nav = () => (

    <div className="nav" >
        <nav>
            <ul className="nav-links">
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/report'>
                    <li>Report</li>
                </Link>
                <Link to='/about'>
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    </div >

);

export default Nav;