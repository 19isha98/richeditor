import React, { Component } from 'react';
import SideNav from 'react-simple-sidenav';
import SideItems from './side_items'
const SideNavigation=(props)=>{
    // navbar is its childre as used im header 
return(
    <div>
       <SideNav 
           showNav={props.showNav}
           onHideNav={props.onHideNav}
           navStyle={{
               //cant use style as we are styling SideNav
            background:'#242424',
            maxWidth:'220px'
        }}
           >
            <SideItems chapters={props.chapters}/>
        {/* calling the items to be shown */}
       </SideNav>
    </div>
)
}
export default SideNavigation;