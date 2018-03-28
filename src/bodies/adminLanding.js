/**
 * Created by jaewonlee on 2018. 2. 9..
 */

import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import * as firebase from "firebase";

import ClassList from './components/adminListing';

class AdminLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:window.innerHeight,
      width:window.innerWidth,
      classes:[]
    };
  }

  resize = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    firebase.database().ref('/classes/').on('value',(snapshot) =>{
      var classes =[];

      snapshot.forEach(function(item) {
        classes.push(item);
      });

      this.setState({classes});
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    return (
      <div className="landingPage" style={{height:this.state.height-100}}>
        <Col lg={12} md={12} sm={12} xs={12} className="landingPageHalfCol">
          <div className="classListWrapper scroll">
          {
            this.state.classes.map((item,i)=>{
              return(
                <ClassList item ={item}/>
              )
            })
          }
          </div>
        </Col>


      </div>
    );
  }
}

/*
<Col lg={4} md={4} sm={4} xs={12} className="landingPageHalfCol">
          <div className="center rightSideWrapper" style={{width:(this.state.width-160)*1/3-90}}>
            <div className="center rightSideButton">
              <p>Manage Professors</p>
            </div>

            <br className="rightSideSpacer"/>

            <div className="center rightSideButton">
              <p>Manage Classes</p>
            </div>
          </div>
        </Col>
 */
 export default AdminLanding;
