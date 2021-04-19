import React, { Component } from 'react';
import { uiConfig } from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

var firebase = require('firebase');

var initApp = function() {
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
    	// User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
         console.log(JSON.stringify({
         displayName: displayName,
         email: email,
         emailVerified: emailVerified,
         phoneNumber: phoneNumber,
         photoURL: photoURL,
         uid: uid,
         accessToken: accessToken,
         providerData: providerData
       }, null, '  '));
     });
		}
	});
}

export { initApp };
// login component
export default class Login extends Component {
	render () {
		return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		);
	}
};
