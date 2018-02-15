/**
 * Created by jaewonlee on 2018. 2. 15..
 */
import React, { Component } from 'react';
//bodies
import MainPage from './bodies/main'
import NavigationBar from './navbar/navigationBar'
import StudentLanding from './bodies/studentLanding'
import ProfLanding from './bodies/professorLanding'
import AdminLanding from './bodies/adminLanding'

const Redirection=()=>(
    <Redirect to={"/main"}/>
);

class App extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Router>
                    <Switch>
                        <Route exact path="/main" component={MainPage} />
                        <Route exact path="/student/*" component={StudentLanding} />
                        <Route exact path="/prof/*" component={ProfLanding}/>
                        <Route exact path="/admin/*" component={AdminLanding}/>
                        <Route path="/*" component={Redirection} />
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default App;
