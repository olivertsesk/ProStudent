import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import * as firebaseFunctions from './firebase'

//bodies
import MainPage from './bodies/main'
import NavigationBar from './navbar/navigationBar'
import StudentLanding from './bodies/studentLanding'
import ProfLanding from './bodies/professorLanding'
import AdminLanding from './bodies/adminLanding'
import About from './bodies/about'

const Redirection=()=>(
    <Redirect to={"/main"}/>
);

firebaseFunctions.init();

//<Route path="/app/*" component={MainPage}/>

ReactDOM.render(
    <div>
        <NavigationBar/>
        <Router>
            <Switch>
                <Route exact path="/main" component={MainPage} />
                <Route exact path="/student/*" component={StudentLanding} />
                <Route exact path="/prof/*" component={ProfLanding}/>
                <Route exact path="/admin/*" component={AdminLanding}/>
                <Route exact path="/about/*" component={About}/>
                <Route path="/*" component={Redirection} />
            </Switch>
        </Router>

    </div>
    , document.getElementById('root'));
registerServiceWorker();
