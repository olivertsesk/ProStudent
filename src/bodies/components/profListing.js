/**
 * Created by jaewonlee on 2018. 2. 14..
 */

import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import * as firebase from "firebase";

class ClassListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPanel:false,
      color_blue: false,
      comments:[],
      polls:[]
    };

    this.comment = this.comment.bind(this)

  }

  changeColor() {
    this.setState({color_blue: !this.state.color_blue});
  }

  componentDidMount() {
    firebase.database().ref('/classes/'+this.props.item.key+'/feedback').on('value',(snapshot) =>{
      var comments = this.state.comments;
      comments =[];

      snapshot.forEach(function(item) {
        comments.push(item);
      });

      comments.sort((a, b)=>{
        return (this.getRating(b)-this.getRating(a));
      });

      this.setState({comments});
    })
//poll

    firebase.database().ref('classes/' +this.props.item.key+ '/poll').on('value',(snapshot) =>{
      var polls = this.state.polls;
      polls = [];
      snapshot.forEach(function(item) {
        polls.push(item);
      });
      this.setState({polls});
    })
  }

  getRating(item){
    var rating = 0;
    if (item.val().up && item.val().down) {
      rating = item.val().up.list.length - item.val().down.list.length;
    } else if (item.val().up) {
      rating = item.val().up.list.length;
    } else if (item.val().down) {
      rating = -item.val().down.list.length;
    }

    return (rating);
  }
  getPoll(item){
    // 'classes/' + childSnapshot.key + '/poll'
    // <p className="listingProf" style={{color: fontColor}}>{this.props.item.val().course.getValue(Poll.class)}</p>
    return item;
  }
  
  comment(item,i){
    return(
      <div className="commentWrapper">
        <Col lg={2} md={2} sm={2} xs={2} className="center commentCol">
          <p className="commentAuthor">{item.val().studentID ? item.val().studentID : "ID Not Recorded"}</p>
        </Col>
        <Col lg={7} md={7} sm={7} xs={7} className="center commentCol">
          <p className="comment">{item.val().comment}</p>
        </Col>
        <Col lg={2} md={2} sm={2} xs={2} className="center commentCol">
          <p className="rating">Rating: {this.getRating(item)}</p>
        </Col>
      </div>
    )
  }
  poll(item,i){
    return(
    <div className="poll">
      <Col lg={7} md={7} sm={7} xs={7} className="center pollCol">
        <h3 className="pollQuestion">{item.val().pollQuestion}</h3>
      </Col>
      <Col lg={7} md={7} sm={7} xs={7} className="center pollCol">
        <p className="pollAnswers">{item.val().ans1}</p>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2} className="center pollCol">
        <p className="pollAnswers">{item.val().ans1count}</p>
      </Col>
      <Col lg={7} md={7} sm={7} xs={7} className="center pollCol">
        <p className="pollAnswers">{item.val().ans2}</p>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2} className="center pollCol">
        <p className="pollAnswers">{item.val().ans2count}</p>
      </Col>
    </div>
  )
  }
  render() {
    let bgColor = this.state.color_blue ? "#3D99D4" : "#FFFFFF";
    let fontColor = this.state.color_blue ? "#FFFFFF" : "#3D99D4";
    return (
      <div>
        <div className="listing" style={{background: bgColor}} onClick={()=>this.setState({showPanel: !this.state.showPanel}, this.changeColor.bind(this))}>
          <p className="listingTitle" style={{color: fontColor}}>{this.props.item.val().course.title}</p>
          <p className="listingProf" style={{color: fontColor}}>{this.props.item.val().professor.name}</p>
        </div>
        {
          this.state.showPanel ?
            <div>
              {this.state.polls.map((item,i)=>this.poll(item, i))}
              {this.state.comments.map((item,i)=>this.comment(item, i))}     
            </div>
          :
            null
        }
      </div>
    );
  }
}

export default ClassListing;
