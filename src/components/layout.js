import React, { Component } from 'react';
import Header from '../components/header/header';

class Layout extends Component {
    state = { 
        showNav:false
     }
     toggleSideNav=(action)=>{
         this.setState({
             showNav:action
         })

     }
    render() { 
        return (  
            <div>
                <Header
                showNav={this.state.showNav}
                //this is for the sidebar
                 onHideNav={()=>this.toggleSideNav(false)}
                 onOpenNav={()=>this.toggleSideNav(true)}
                 chapters={this.props.chapters}
                 //we are passing the state -true open and false close
                />
                {this.props.children}
                {/* refers to home as in Route.js home is its children  */}
            </div>
        );
    }
}
 
export default Layout;