/**
 * Created by jaewonlee on 2018. 2. 9..
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Col,
  ButtonGroup,
  Button,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

import CommentList from "./components/studentListing"
import * as data from './../data'
import * as firebase from 'firebase'


class StudentLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      height:window.innerHeight,
      width:window.innerWidth,
      studentID:null,
      courseInfo:null,
      currentTag:"Other",
    };
  }

  sendFeedback() {
    // var comment = this.state.feedback.comment
    firebase.database().ref('/classes/' + data.getCourseID() + '/feedback').push({
      comment:this.state.feedback.comment,studentID:this.state.studentID,tag:this.state.currentTag
    }).then(()=>{
      this.setState({mode:0})
    }).catch((e)=>{
      alert(e);
    })
  }

  resize = () => {
    this.setState({width:window.innerWidth,height:window.innerHeight});
  }

  componentWillMount(){
    this.setState({studentID:data.getID(),courseInfo:data.getInfo()});
    this.setState({loading:false});
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  setTag(tag){
    this.setState({currentTag:tag});
  }

  render() {
    if(!this.state.courseInfo) {
      return(<Redirect to={'/main'}/>)
    }

    return (
      <div className="landingPage" style={{height:this.state.height-100}}>
        <Col lg={12} md={12} sm={12} xs={12} className="scroll feedbackwrapper">
          <div className="feedbackInnerWrapper">
            <h2 className="title">Leave Your Feedback</h2>
            <div className="feedbackline">
              <DropdownButton title={this.state.currentTag} id="dropdown-size-large" className="formselector">
                <MenuItem eventKey="1" value="Question" onSelect={()=>this.setTag("Question")}>Question</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="2" value="Suggestion" onSelect={()=>this.setTag("Suggestion")}>Suggestion</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="3" value="Compliment" onSelect={()=>this.setTag("Compliment")}>Compliment</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4" value="Complaint" onSelect={()=>this.setTag("Complaint")}>Complaint</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="5" value="Other" onSelect={()=>this.setTag("Other")}>Other</MenuItem>
              </DropdownButton>
              <input className="forminput" placeholder="Comment here..." onChange={(e)=> this.setState({feedback: {...this.state.feedback, comment: e.target.value}})}/>
            </div>
            <div className="feedbackline">
            <ButtonGroup className="center">
              <Button bsSize="large" className="loginbutton" style={{width:this.state.width/3}} onClick={()=>{
                this.sendFeedback();
                }}>
                <p style={{color:'white', fontSize:20}}>Submit Feedback</p>
              </Button>
            </ButtonGroup>
          </div>

          <hr className="formseperator"/>

        </div>
        <div>
          <CommentList item={this.state.courseInfo}/>
        </div>
      </Col>
    </div>
  )
}
}

export default StudentLanding;
