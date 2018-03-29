/**
 * Created by jaewonlee on 2018. 2. 9..
 */

import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import * as firebase from 'firebase';

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
    const adminID = "stpX94g415buRPBTRLCl9jKnbbU2"
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (adminID != user.uid) {
          this.props.history.push('/prof/');
        }
      } else {
        this.props.history.push('/main');
      }
    });

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
      firebase.database().ref('/classes/').off();
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

 export default AdminLanding;
