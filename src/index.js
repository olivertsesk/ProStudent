import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './structure';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';



//<Route path="/app/*" component={MainPage}/>

ReactDOM.render(
    <App/>
    , document.getElementById('root'));
registerServiceWorker();
