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
import * as firebaseFunctions from "../../firebase";

const comments = [1,2];

class AdminListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel:false,
            color_blue: false,
            comments:[]
        };
        this.comment = this.comment.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
    }

    changeColor(){
        this.setState({color_blue: !this.state.color_blue})
    }

    componentDidMount(){
        firebase.database().ref('/classes/'+this.props.item.key+'/feedback').orderByChild("list").on('value',(snapshot) =>{
            console.log(snapshot.val())
            var comments = this.state.comments;
            comments =[];

            snapshot.forEach(function(item) {
                comments.push(item);
            });
            comments.sort((a,b)=>{
                if(b.val().up&&a.val().up&&b.val().down&&a.val().down)
                    return ((b.val().up.length - b.val().down.length) - (a.val().up.length - a.val().down.length));
            });
            comments.reverse()
            this.setState({comments})
            console.log(comments + this.props.item.key)
        })
    }

    deleteComment(item){
        firebase.database().ref('/classes/'+this.props.item.key+'/feedback/'+item.key).remove(()=>alert('removed')).catch(()=>('failed'))
    }

    getRating(item){
        var rating = 0;
        if (item.val().up && item.val().down){
            rating = item.val().up.length - item.val().down.length;
        }else if(item.val().up){
            rating = item.val().up.length;
        }else if(item.val().down){
            rating = -item.val().down.length;
        }

        return(rating);
    }

    comment(item,i){
        return(
          <div style={{height:100,border:"solid",borderColor:'#343f4b'}}>
              <Col lg={10} md={10} sm={10} xs={10} className='center' style={{height:'100%',fontSize:15}}>
                  {item.val().comment}
              </Col>
              <Col lg={2} md={2} sm={2} xs={2} className='center' style={{height:'100%',fontSize:30}}>
                  <img src={require('./../../image/delete.svg')} style={{position:'absolute',top: 10, right : 10, width:10,height:10}}
                       onClick={()=>{
                           var r = window.confirm("Are you sure?")
                           if(r){
                               this.deleteComment(item,i)
                           }
                       }}
                  />
                  Rating: {this.getRating(item)}
              </Col>
          </div>
        )
    }

    render() {
      let bgColor = this.state.color_blue ? "#3D99D4" : "white"
        return (
            <div>
                <div style={{height:150,border:"solid",borderColor:'#343f4b', background: bgColor}} onClick={()=>this.setState({showPanel:!this.state.showPanel}, this.changeColor.bind(this))}>
                    <Col lg={7} md={7} sm={7} xs={7} className='center' style={{height:'100%',fontSize:30}}>
                        <p style={{width:'100%'}}>{this.props.item.val().course.title}</p>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4} className='center' style={{height:'100%',fontSize:30}}>
                        {this.props.item.val().professor.name}
                    </Col>
                </div>
                {this.state.showPanel?
                        <div>
                          {
                            this.state.comments.map((item,i)=>this.comment(item,i))
                          }
                        </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default AdminListing;
