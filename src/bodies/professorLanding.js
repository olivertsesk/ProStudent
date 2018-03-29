/**
 * Created by jaewonlee on 2018. 2. 9..
 */
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import ClassList from './components/profListing'
import ClassManager from './classSettings'

import * as firebase from 'firebase'

var myClass = [];

class ProfLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      height:window.innerHeight,
      width:window.innerWidth,
      classManager:false,
    };
  }

  resize = () => {
    this.setState({width:window.innerWidth,height:window.innerHeight});
  }

  componentWillMount() {}

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.setState({loading:true});

    if(!firebase.auth().currentUser ||
       !firebase.auth().currentUser.uid ||
       firebase.auth().currentUser === null ||
       firebase.auth().currentUser === undefined) {
      this.props.history.push('/');
    } else {
      firebase.database().ref('/classes').orderByChild('professor/UID').equalTo(firebase.auth().currentUser.uid).on('value',(snapshot)=>{
        //console.log(snapshot.val())

        snapshot.forEach(childSnapshot => {
          myClass.push(childSnapshot);
        });

        this.setState({loading:false});
        this.forceUpdate();
      });
    }
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
      firebase.database().ref('/classes').off();
  }


  render() {
    if(this.state.loading) {
      return (<div>Loading</div>)
    } else {
      return (
        <div>
        {
          this.state.classManager ?
            <ClassManager close={()=>this.setState({classManager: false})}/>
          :
            <div className="landingPage" style={{height:this.state.height-100}}>
              <Col lg={8} md={8} sm={8} xs={12} className="landingPageHalfCol">              
                
                <div className="classListWrapper scroll">
                {
                  myClass.map((item,i)=>{
                    return(      
                      <ClassList item ={item} key={i}/>
                      
                    );
                  })
                }
                
                </div>
                
              </Col>

              <Col lg={4} md={4} sm={4} xs={12} className="landingPageHalfCol">
                <div className="center rightSideWrapper" style={{width:(this.state.width-160)*1/3-90}}>
                  <div className="center rightSideButton">
                    <p>Manage Professors</p>
                  </div>

                  <br className="rightSideSpacer"/>

                  <div className="center rightSideButton" onClick={()=>this.setState({classManager:true})}>
                    <p>Manage Classes</p>
                  </div>
                </div>
              </Col>
            </div>
          }
          </div>
        )
      }
    }

}

export default ProfLanding;
