/**
 * Created by jaewonlee on 2018. 2. 9..
 */

import React, { Component } from 'react';
import{ Navbar, Nav, NavItem } from 'react-bootstrap';

import * as firebase from 'firebase'
import * as firebaseFunctions from './../firebase'

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  resize = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    firebase.auth().onAuthStateChanged((user)=>{
      this.setState({changeState: !this.state.changeState});
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    return (
      <div style={{width: this.state.width}}>
        <div className="background" style={{width: window.innerWidth, height: window.innerHeight}}/>
          <Navbar className="navbar">
            <Navbar.Header>
              <Navbar.Brand>
                <a className="brandmark" href="/">ProStudent</a>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/about/" onClick={()=>this.setState({about: true, contactus: false})}>
                <p className="navitem">About</p>
              </NavItem>
              <NavItem eventKey={2} href="/contact/" onClick={()=>this.setState({about: false, contactus: true})}>
                <p className="navitem">Contact Us</p>
              </NavItem>
              {
                firebase.auth().currentUser ?
                  <NavItem eventKey={2} href="#" onClick={()=>{
                    var r = window.confirm("Are you sure?");
                    if (r) {
                      firebaseFunctions.logout();
                    }}}>
                    <p className="navitem">Logout</p>
                  </NavItem>
                :
                  null
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
