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

        firebase.database().ref('classes/' +this.props.item.key+ '/polls').on('value',(snapshot) =>{
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
