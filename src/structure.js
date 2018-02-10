/**
 * Created by jaewonlee on 2018. 2. 9..
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

//bodies
import MainPage from './bodies/main'
import NavigationBar from './navbar/navigationBar'
import StudentLanding from './bodies/studentLanding'
import ProfLanding from './bodies/professorLanding'

//constant
const Redirection=()=>(
    <Redirect to={"/main"}/>
);

class Structure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight,
            width:window.innerWidth
        };
    }
    resize = () => {
        this.setState({width:window.innerWidth,height:window.innerHeight})
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="background" style={{width:this.state.width,height:this.state.height,position:'fixed',backgroundImage:'url('+require('./image/mainbg.jpeg')+')',backgroundSize:'cover',top:0,left:0}}/>
                <Router>
                    <div>
                        <Route exact path="/main" component={MainPage}/>
                        <Route exact path="/student/*" component={StudentLanding} />
                        <Route exact path="/prof/*" component={ProfLanding} />
                        <Route exact path="/*" component={Redirection}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Structure;
