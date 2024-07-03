import React, { useState, useEffect } from 'react';
import './header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            window.location.href = '/ca';
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className='h-wrap'>
            <div className='navbar'>
                <div className="logo">
                   <a href="/ca"><img src="/spiritlogo.jpg" alt="Logo" /></a> 
                </div>
                <div className={`points ${isMenuOpen ? 'active' : ''}`}>
                    <a href="/ca/#aboutus">About</a>
                    <a href="/ca/#sponsors">Sponsors</a>
                    <a href="/ca/#faq">FAQ</a>
                    <a href="/ca/#footer">Contact Us</a>
                </div>
                <div className="login">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="logbut">Logout</button>
                    ) : (
                        <a href="/ca/login" className="log">Login</a>
                    )}
                </div>
                <div className="hamburger" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><a href="/ca/#aboutus">About</a></li>
                <li><a href="/ca/#sponsors">Sponsors</a></li>
                <li><a href="/ca/#contactus">Contact Us</a></li>
                <li><a href="/ca/#faq">FAQ</a></li>
            </ul>
        </section>
    );
};

export default Header;
