import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Dropdown.css';
import { Redirect } from "react-router-dom";


var firebase = require('firebase');

class Dropdown extends Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

showDropdownMenu(event) {
  event.preventDefault();
  this.setState({ displayMenu: true }, () => {
  document.addEventListener('click', this.hideDropdownMenu);
  });
}

hideDropdownMenu() {
  this.setState({ displayMenu: false }, () => {
    document.removeEventListener('click', this.hideDropdownMenu);
  });
}

render() {
  if (this.state.redirect === "/profile") {
    var auth = firebase.auth();
    return <Redirect to={{
      pathname: "/profile",
      state: { uid:auth.currentUser.uid}
    }} />;
  } 
  return (
        <div className="dropdown">
            <div className="button" onClick={this.showDropdownMenu}> 
                <Avatar>{firebase.auth().currentUser.displayName.toUpperCase().charAt(0)}</Avatar>
            </div>

            { this.state.displayMenu ? (
            <ul id="dropdown-ul">
            <li id="dropdown-li"><a id="dropdown-a" className="active" onClick={
              ()=> this.setState({redirect: "/profile"})}>profile</a></li>
            <li id="dropdown-li"><a id="dropdown-a" href="settings">settings</a></li>
            <li id="dropdown-li"><a id="dropdown-a" href="logout">logout</a></li>
            </ul>
            ):
            (
            null
            )
            }
        </div>
    );
  }
}

export default Dropdown;