/**
 * Created by jaewonlee on 2018. 2. 9..
 * Last Updated: 05/03/2018 by Jeremy Mallette
 */

// Library Imports
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Col } from 'react-bootstrap';

// Local Dependencies
import ClassList from './components/adminListing';
import * as fire from './../firebase';
import * as data from '../data';

// Admin Landing Page Class ----------------------------------------------------
class AdminLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  // Capture Resize
  resize = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  // Main Page JSX -------------------------------------------------------------
  render() {
    return (
      <div className="landingPage" style={{height:this.state.height-65}}>
        <Col className="landingPageHalfCol" lg={8} md={8} sm={8} xs={12}>
          <div className="classListWrapper">
            <ClassList/>
            <ClassList/>
            <ClassList/>
          </div>
        </Col>

        <Col className="landingPageHalfCol" lg={4} md={4} sm={4} xs={12}>
          <div className="rightSideWrapper" style={{width:(this.state.width-160)*1/3-90}}>
            <div className="center rightSideButton">
              <p>Manage Professors</p>
            </div>
            <br className="rightSideSpacer"/>
            <div className="center rightSideButton">
              <p>Manage Classes</p>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default AdminLanding;
