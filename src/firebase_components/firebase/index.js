import React from 'react'
import { firebaseConfig, uiConfig } from './config'

const FirebaseContext = React.createContext(null);

export { firebaseConfig, uiConfig, FirebaseContext };
