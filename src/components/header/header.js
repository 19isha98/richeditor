import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faBars } from '@fortawesome/free-solid-svg-icons'
import SideNav from './sideNav/sideNav'
import './header.css';

const Header=(props)=>{  

    const navBars=()=>{
        // this is the side-bar which is present on fontAwesome
        return(
            <div className={`bars`}>
            <FontAwesomeIcon icon={faBars}
             onClick={props.onOpenNav}
            style={{
                color:'#dfdfdf',
                cursor:'pointer',
                padding:'7px',
                size:'7x',
                fontColor:'white'
            }} 
            CHAPTERS
            />
            {/* this is the small bar icon which we see at the leftmost */}
        </div>
        )
    }

        return (
            <header className={`header`}>
            <SideNav {...props}/>
            {/* ...props calls out all the properties */}
            <div className={`headeropt`}>
            {navBars()}
             {/* first we see that small bar and then logo */}
            </div>            
        </header>
          );
}
 
export default Header;