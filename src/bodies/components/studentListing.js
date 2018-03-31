/**
 * Created by jaewonlee on 2018. 2. 10..
 */
import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';

import * as firebase from 'firebase'
import * as data from './../../data'

class StudentListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPanel:false,
      comments : [],
      polls:[]
    };

    this.comment = this.comment.bind(this)
    this.upvote = this.upvote.bind(this)
    this.downvote = this.downvote.bind(this)
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

    return(rating);
  }

  componentWillMount(){
    firebase.database().ref('/classes/'+data.getCourseID()+'/feedback').on('value',(snapshot) =>{
      var comments = this.state.comments;
      comments =[];

      snapshot.forEach(function(item) {
        comments.push(item);
      });

      //sort listing by number of votes
      comments.sort((a,b)=>{
        return (this.getRating(b)-this.getRating(a));
      });

      //sort polls by most recent

      this.setState({comments});
    })

    firebase.database().ref('/classes/' +data.getCourseID()+ '/polls').on('value',(snapshot) =>{
      var polls = this.state.polls;
      polls = [];

      snapshot.forEach(function(item) {
        polls.push(item);
      });

      polls.sort((a,b) => {
        return(b.val().date - a.val().date);
      });

      this.setState({polls});
    })
  }
  componentWillUnmount(){
      firebase.database().ref('/classes/'+data.getCourseID()+'/feedback').off();
      firebase.database().ref('/classes/' +data.getCourseID()+ '/polls').off();
  }

  upvote(item){
    var up_list = [];
    if (item.val().up) {
      up_list= item.val().up.list;
    }

    up_list.push(data.getID());
    firebase.database().ref('/classes/'+data.getCourseID()+'/feedback/'+item.key + '/up').update({
      list:up_list
    }).then(()=>{
    }).catch(()=>{
      alert("Error in upvoting comment")
    })
  }

  downvote(item) {
    var down_list = [];
    if(item.val().down) {
      down_list= item.val().down.list;
    }

    down_list.push(data.getID());
    firebase.database().ref('/classes/'+data.getCourseID()+'/feedback/'+item.key + '/down').update({
      list:down_list
    }).then(()=>{
    }).catch(()=>{
      alert("Error in downvoting comment")
    })
  }

  choosePollResponse(item, i){
    var respList;
    switch (i){
      case 1:
        item.val().ans1.responses ? respList = item.val().ans1.responses : respList = [];
        respList.push(data.getID());
        firebase.database().ref('/classes/'+data.getCourseID() + '/polls/' + item.key + '/ans1').update({
          responses:respList
        }).then(()=>{
        }).catch(()=>{
          alert("Error in responding to poll")
        })
        break;
      case 2:
        item.val().ans2.responses ? respList = item.val().ans2.responses : respList = [];        
        respList.push(data.getID());
        firebase.database().ref('/classes/'+data.getCourseID() + '/polls/' + item.key + '/ans2').update({
         responses:respList
        }).then(()=>{
        }).catch(()=>{
          alert("Error in responding to poll")
        })
        break;
      case 3:
        item.val().ans3.responses ? respList = item.val().ans3.responses : respList = [];        
        respList.push(data.getID());
        firebase.database().ref('/classes/'+data.getCourseID() + '/polls/' + item.key + '/ans3').update({
         responses:respList
        }).then(()=>{
        }).catch(()=>{
          alert("Error in responding to poll")
        })
        break;
      default:
        break;
    }
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

  isActive(i){
    var myID = data.getID();
    var up = this.state.comments[i].val().up;
    var down = this.state.comments[i].val().down;
    if (this.state.comments[i].val().up && this.state.comments[i].val().down) {
      return(!up.list.includes(myID)&&!down.list.includes(myID));
    } else if (this.state.comments[i].val().up) {
      return(!up.list.includes(myID));
    } else if (this.state.comments[i].val().down) {
      return(!down.list.includes(myID));
    } else {
      return(true);
    }
  }

  hasResponded(item){
    var myID = data.getID();
    var ans1 = item.val().ans1.responses;
    var ans2 = item.val().ans2.responses;
    var ans3 = item.val().ans3.responses;
    if(ans1 && ans2 && ans3){
      return(ans1.includes(myID) || ans2.includes(myID) || ans3.includes(myID))
    }else if (ans1 && ans2){
      return(ans1.includes(myID) || ans2.includes(myID))
    }else if (ans1 && ans3){
      return(ans1.includes(myID) || ans3.includes(myID))
    }else if (ans2 && ans3){
      return(ans2.includes(myID) || ans3.includes(myID))
    }else if (ans1){
      return(ans1.includes(myID))
    }else if (ans2){
      return(ans2.includes(myID))
    }else if (ans3){
      return(ans3.includes(myID))
    }else{
      return(false)
    }
  }

  comment(item,i){
    return(
      <div className="bottomsep commentWrapper" key ={i}>
        <Col lg={2} md={2} sm={2} xs={2} className="center commentCol">
          <p className="center commentType">{item.val().tag?item.val().tag:"No Tag"}</p>
        </Col>
        <Col lg={6} md={6} sm={6} xs={6} className="center commentCol">
          <p className="center comment">{item.val().comment}</p>
        </Col>
        <Col lg={2} md={2} sm={2} xs={2} className="center commentCol">
          <Button className="ratingButton" onClick={()=>this.upvote(item)}
            active={this.isActive(i)}
            disabled={!this.isActive(i)}>
            <img src={require('./../../image/thumbs_up.png')} alt="/\\" className="ratingImg"/>
          </Button>
          <Button className="ratingButton" onClick={()=>this.downvote(item)}
            active={this.isActive(i)}
            disabled={!this.isActive(i)}>
            <img src={require('./../../image/thumbs_down.png')} alt="\\/" className="ratingImg"/>
          </Button>
        </Col>
        <Col lg={2} md={2} sm={2} xs={2} className="center rating">
          <p>Rating: {this.getRating(item)}</p>
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
            <input type="radio" value="option1" active={!this.hasResponded(item)} disabled= {this.hasResponded(item)} 
              onClick={()=>this.choosePollResponse(item, 1)}/>
            {item.val().ans1.value}   [Selections : {item.val().ans1.responses ? item.val().ans1.responses.length : 0}, {item.val().ans1.responses ?this.getPercentResponse(item, 1):0}%]
          </p>
          </div>
          <div>
          <p>
            <input type="radio" value="option2" active={!this.hasResponded(item)} disabled= {this.hasResponded(item)} 
              onClick={()=>this.choosePollResponse(item, 2)}/>
            {item.val().ans2.value}   [Selections : {item.val().ans2.responses ? item.val().ans2.responses.length : 0}, {item.val().ans2.responses ?this.getPercentResponse(item, 2):0}%]
          </p>
          </div>
          <div>
          <p>
            <input type="radio" value="option3" active={!this.hasResponded(item)} disabled= {this.hasResponded(item)} 
              onClick={()=>this.choosePollResponse(item, 3)}/>
            {item.val().ans3.value}   [Selections : {item.val().ans3.responses ? item.val().ans3.responses.length : 0}, {item.val().ans3.responses ?this.getPercentResponse(item, 3):0}%]
          </p>
          </div>
          </form>
        </Col>
      </div>

    )
  }

  render() {
    return (
      <div>
        <div className="listing" onClick={()=>this.setState({showPanel:!this.state.showPanel})}>
          <p className="listingProf">{this.props.item.course.code}</p>
          <p className="listingTitle">{" "+this.props.item.course.title}</p>
        </div>
        <div>
        {this.state.polls.map((item,i)=>this.poll(item, i))}
        {this.state.comments.map((item,i)=>this.comment(item,i))}
        </div>
      </div>
    );
  }
}

export default StudentListing;
