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

    console.log(this.state)

    this.comment = this.comment.bind(this);
  }

  changeColor(){
    this.setState({color_blue: !this.state.color_blue});
  }

  comment(){
    return(
      <div style={{height:100,border:"solid",borderColor:'#343f4b'}}>
        <Col lg={2} md={2} sm={2} xs={2} className='center' style={{height:'100%',fontSize:15}}>
          <p style={{width:'100%'}}>ID: 260000000</p>
        </Col>

        <Col lg={6} md={6} sm={6} xs={6} className='center' style={{height:'100%',fontSize:15}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat.
        </Col>

        <Col lg={3} md={3} sm={3} xs={3} className='center' style={{height:'100%',fontSize:30}}>
          Rating: 0
        </Col>
      </div>
    );
  }

  render() {
    let bgColor = this.state.color_blue ? "#3D99D4" : "white"
    return (
      <div>
        <div style={{height:150,border:"solid",borderColor:'#343f4b', background: bgColor}} onClick={()=>this.setState({showPanel:!this.state.showPanel}, this.changeColor.bind(this))}>
          <Col lg={7} md={7} sm={7} xs={7} className='center' style={{height:'100%',fontSize:30}}>
            <p style={{width:'100%'}}>{this.state.course}</p>
          </Col>

          <Col lg={4} md={4} sm={4} xs={4} className='center' style={{height:'100%',fontSize:30}}>
            <p>{this.state.prof}</p>
          </Col>
        </div>
        {this.state.showPanel?
          <Panel style={{width:'100%',height:250}}>
            <div>
            {
              comments.map(()=>this.comment())
            }
            </div>
          </Panel>
          :
          null
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
    ref.once('value', snap => {
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
    this.setState({listings: concat}, () => {console.log(this.state.listings)})
  }

  render() {
    return (
      // <h1>Hello World</h1>
      this.state.listings
    );
  }
}

export default AdminListings;
