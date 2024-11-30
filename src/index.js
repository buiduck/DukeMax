import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from 'react-router-dom';
import router from './routes';
import axios from 'axios';
import {Provider} from 'react-redux';
import {store} from './store/store.jsx'
import KeycloakService from "./components/keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";

// Set up AXIOS
// axios.defaults.baseURL="https://api.themoviedb.org/3";
axios.defaults.baseURL = "https://phimapi.com";
// axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<React.StrictMode>
    <ReactKeycloakProvider authClient={KeycloakService.keycloak} initOptions={{
        onLoad: 'check-sso',
        checkLoginIframe: false

    }}>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </ReactKeycloakProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
