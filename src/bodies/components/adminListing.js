/**
 * Created by jaewonlee on 2018. 2. 10..
 */
import React, { Component } from 'react';
import{
    Navbar,
    Nav,
    NavItem,
    Col,
    Panel
} from 'react-bootstrap'
import * as firebase from "firebase";

const comments = [1,2];

class AdminListing extends Component {
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

    changeColor(){
        this.setState({color_blue: !this.state.color_blue})
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

                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className="center rating">
                    <p>Rating: {this.getRating(item)}</p>
                </Col>
            </div>
        )
    }
    poll(item,i){
        return(
            <div className="commentWrapper">
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
            </div>
        )
    }

    render() {
      let bgColor = this.state.color_blue ? "#3D99D4" : "white"
        return (

                <div style ={{background:"white",borderRadius : 8}}>
                    <div className="listing" onClick={()=>this.setState({showPanel:!this.state.showPanel})}>
                        <p className="listingProf">{this.props.item.val().course.code}</p>
                        <p className="listingTitle">{" "+this.props.item.val().course.title}</p>
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

export default AdminListing;
