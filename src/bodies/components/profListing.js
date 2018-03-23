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
      comments:[]
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

  getPoll(){
    var question, ans1, ans1count, ans2, ans2count;
    var classes = firebase.database().ref('classes/'+this.props.item.key);
    classes.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.key === "poll") {
          for (var i = 0; i < 5; i++) {
            switch(Object.keys((Object.values(childSnapshot.val())[0]))[i]) {
              case "ans1":
                ans1 = Object.values((Object.values(childSnapshot.val())[0]))[i];
                break;
              case "ans1count":
                ans1count = Object.values((Object.values(childSnapshot.val())[0]))[i];
                break;
              case "ans2":
                ans2 = Object.values((Object.values(childSnapshot.val())[0]))[i];
                break;
              case "ans2count":
                ans2count = Object.values((Object.values(childSnapshot.val())[0]))[i];
                break;
              case "pollQuestion":
                question = Object.values((Object.values(childSnapshot.val())[0]))[i];
                break;
              default:
                break;
            }
          }
        }
      });
    });
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
