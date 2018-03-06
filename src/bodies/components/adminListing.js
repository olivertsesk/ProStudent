/**
 * Created by jaewonlee on 2018. 2. 10..
 * Last Upated by Jeremy Mallette on 05/03/2018
 */

// Library Imports
import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';
import * as firebase from 'firebase';

// Local Dependencies
import * as fire from './../../firebase';
import * as data from './../../data';

const comments = [1,2];

// Admin Listing Class ---------------------------------------------------------
class AdminListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      prof: props.prof,
      feedback: props.feedback,
      showPanel: false,
      color_blue: false
    };

    this.comment = this.comment.bind(this);
  }

  changeColor(){
    this.setState({color_blue: !this.state.color_blue});
  }

  comment(){
    return(
      <div className="commentWrapper">
        <Col lg={5} md={5} sm={5} xs={5} className="commentCol">
          <div className="commentAuthor">
            <p>ID: TEST</p>
          </div>
          <div className="comment">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat.</p>
          </div>
        </Col>
        <Col lg={2} md={2} sm={2} xs={2} className="commentCol">
          <p>Rating: 0</p>
        </Col>
      </div>
    );
  }

  render() {
    let bgColor = this.state.color_blue ? "#3D99D4" : "white"
    return (
      <div>
        <div className="listing" style={{background: bgColor}} onClick={()=>this.setState({showPanel:!this.showPanelEvent}, ()=>console.log(this.state.showPanel))}>
          <div lg={7} md={7} sm={7} xs={7} className="listingTitle">
            <p>{this.state.course}</p>
          </div>
          <div lg={4} md={4} sm={4} xs={4} className="listingProf">
            <p>{this.state.prof}</p>
          </div>
        </div>
        {
          this.state.showPanel ?
            <Panel className="listingPanel scroll">
              <div>
                {comments.map(()=>this.comment())}
              </div>
            </Panel> : null
        }
      </div>
    );
  }
}

// Admin Listings Class --------------------------------------------------------
class AdminListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: {},
      listings: []
    };
  }

  // On Init, Query Database for all Courses
  componentDidMount() {
    const ref = firebase.database().ref('classes/').orderByChild('course/code');
    ref.on('value', snap => {
      this.setState({courses: snap.val()}, ()=> {
        this.buildListings();
      });
    });
  }

  buildListings() {
    var concat = [];

    // Iterate Through Found Courses
    for (var key in this.state.courses) {
      if (this.state.courses.hasOwnProperty(key)) {
        var c = this.state.courses[key];

        // Take Useful Information to Construct Listing
        var props = {
          course: c.course.title,
          prof: c.professor.name,
          feedback: c.feedback
        }

        // Construct Listing and Append JSX to Listings
        var listing = new AdminListing(props);
        concat = [...concat, listing.render()];
      }
    }

    // Update State With Build Listings
    this.setState({listings: concat});
  }

  render() {
    return (
      // <h1>Hello World</h1>
      this.state.listings
    );
  }
}

export default AdminListings;
