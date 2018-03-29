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

    firebase.database().ref('classes/' +this.props.item.key+ '/polls').on('value',(snapshot) =>{
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

  /*getPoll(){
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
  }*/

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
      <div className="bottomsep commentWrapper" key ={i}>
      <Col lg={2} md={2} sm={2} xs={2} className="center commentCol">
        <p className="center commentType">Professor Poll</p>
      </Col>
      <Col lg={5} md={5} sm={5} xs={5} className="center commentCol">
        <p className="center comment">{item.val().question}</p>
      </Col>
      <Col lg={5} md={5} sm={5} xs={5} className="center commentCol">
        <form className="form-group">
        <div>
        <p>
          <input type="radio" value="option1"  disabled= {true}/>
          {item.val().ans1.value}   [Selections : {item.val().ans1.responses ? item.val().ans1.responses.length : 0}, {this.getPercentResponse(item, 1)}%]
        </p>
        </div>
        <div>
        <p>
          <input type="radio" value="option2"  disabled= {true}/>
          {item.val().ans2.value}   [Selections : {item.val().ans2.responses ? item.val().ans2.responses.length : 0}, {this.getPercentResponse(item, 2)}%]
        </p>
        </div>
        <div>
        <p>
          <input type="radio" value="option3"  disabled= {true} />
          {item.val().ans3.value}   [Selections : {item.val().ans3.responses ? item.val().ans3.responses.length : 0}, {this.getPercentResponse(item, 3)}%]
        </p>
        </div>
        </form>
      </Col>
    </div>

  )
  }

  getTotalResponses(item){
    var numResponses = 0;

    if(item.val().ans1.responses){
      numResponses += item.val().ans1.responses.length;
    }

    if(item.val().ans2.responses){
      numResponses += item.val().ans2.responses.length;
    }

    if(item.val().ans3.responses){
      numResponses += item.val().ans3.responses.length;
    }

    return(numResponses)
  }

  getPercentResponse(item, i){
    var total = this.getTotalResponses(item);
    var answerTotal = 0;
    switch (i){
      case 1:
        if(item.val().ans1.responses){
          answerTotal = item.val().ans1.responses.length;
        }
      break;
      case 2:
        if(item.val().ans2.responses){
         answerTotal = item.val().ans2.responses.length;
        }
      break;
      case 3:
        if(item.val().ans3.responses){
          answerTotal = item.val().ans3.responses.length;
        }
      break;
      default:
      break;
    }

    return(((answerTotal/total)*100).toFixed(2))

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
              {this.state.polls.map((item,i)=>this.poll(item, i))}
            </div>
          :
            null
        }
      </div>
    );
  }
}

export default ClassListing;
