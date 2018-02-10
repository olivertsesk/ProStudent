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

//bodies
import MainPage from './bodies/main'
import NavigationBar from './navbar/navigationBar'
import StudentLanding from './bodies/studentLanding'
import ProfLanding from './bodies/professorLanding'

const Redirection=()=>(
    <Redirect to={"/main"}/>
);

//<Route path="/app/*" component={MainPage}/>

ReactDOM.render(
    <div>
        <NavigationBar/>
        <Router>
            <Switch>
                <Route exact path="/main" component={MainPage} />
                <Route exact path="/student/*" component={StudentLanding} />
                <Route exact path="/prof/*" component={ProfLanding}/>
                <Route path="/*" component={Redirection} />
            </Switch>
        </Router>

    </div>
    , document.getElementById('root'));
registerServiceWorker();
