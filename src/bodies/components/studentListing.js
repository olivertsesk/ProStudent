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
      comments : []
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

      this.setState({comments});
    })

    // console.log(this.props)
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

  render() {
    return (
      <div>
        <div className="listing" onClick={()=>this.setState({showPanel:!this.state.showPanel})}>
          <p className="listingProf">{this.props.item.course.code}</p>
          <p className="listingTitle">{" "+this.props.item.course.title}</p>
        </div>
        <div>
        {
          this.state.comments.map((item,i)=>this.comment(item,i))
        }
        </div>
      </div>
    );
  }
}

export default StudentListing;
