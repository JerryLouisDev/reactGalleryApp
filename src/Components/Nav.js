import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul className="main-nav">
            <li> <NavLink to="/basketball"> Basketball</NavLink></li>
            <li> <NavLink to="/honda"> Honda</NavLink></li>
            <li> <NavLink to="/lion"> Lion </NavLink></li>
        </ul>
    </nav>
);

export default Nav;