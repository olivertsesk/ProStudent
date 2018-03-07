/**
 * Created by jaewonlee on 2018. 2. 10..
 */
import React, { Component } from 'react';
import{
    Navbar,
    Nav,
    NavItem,
    Col,
    Button,
    Radio
} from 'react-bootstrap'
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
        if (item.val().up && item.val().down){
            rating = item.val().up.list.length - item.val().down.list.length;
        }else if(item.val().up){
            rating = item.val().up.list.length;
        }else if(item.val().down){
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
            comments.sort((a,b)=>{
                    return (this.getRating(b)-this.getRating(a));
            });
            this.setState({comments})
        })
        console.log(this.props)
    }

    upvote(item){
        var up_list;
        if(item.val().list!==null && item.val().list !==undefined){
            up_list= item.val().up.list;
        }
        else up_list = [];
        up_list.push(data.getID());
        firebase.database().ref('/classes/'+data.getCourseID()+'/feedback/'+item.key + '/up').update({
            list:up_list
        }).then(()=>{
        }).catch(()=>{
            alert("Error in upvoting comment")
        })
    }

    downvote(item){
        var down_list;
        if(item.val().list!==null && item.val().list !==undefined){
            down_list= item.val().down.list;
        }
        else down_list = [];
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
        if (this.state.comments[i].val().up && this.state.comments[i].val().down){
            return(!up.list.includes(myID)&&!down.list.includes(myID));
        }else if(this.state.comments[i].val().up){
            return(!up.list.includes(myID));
        }else if(this.state.comments[i].val().down){
            return(!down.list.includes(myID));
        }else{
            return(true);
        }
    }

    comment(item,i){
        return(
            <div style={{height:100,border:"solid",borderColor:'#343f4b'}} key ={i}>
                <Col lg={8} md={8} sm={8} xs={8} className='center' style={{height:'100%',fontSize:15}}>
                    <p>{item.val().comment}</p>
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className='center' style={{height:'100%',fontSize:30,color:'#343f4b'}}>
                    <Button onClick={()=>this.upvote(item)}
                            active={this.isActive(i)}
                            disabled={!this.isActive(i)}
                    >
                        <img src={require('./../../image/thumbs_up.png')} style={{width:40,height:40}}/>
                    </Button>
                    <Button onClick={()=>this.downvote(item)}
                            active={this.isActive(i)}
                            disabled={!this.isActive(i)}
                    >
                        <img src={require('./../../image/thumbs_down.png')} style={{width:40,height:40}}/>
                    </Button>
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className='center' style={{height:'100%',fontSize:30,color:'#343f4b'}}>
                    <p>Rating: {this.getRating(item)}</p>
                </Col>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div style={{height:150,border:"solid",borderColor:'#343f4b'}} onClick={()=>this.setState({showPanel:!this.state.showPanel})}>
                    <Col lg={3} md={3} sm={3} xs={3} className='center' style={{height:'100%',fontSize:30}}>
                        <p style={{width:'100%'}}>{this.props.item.course.code}</p>
                    </Col>
                    <Col lg={9} md={9} sm={9} xs={9} className='center' style={{height:'100%',fontSize:45}}>
                        <p style={{width:'100%'}}>{" "+this.props.item.course.title}</p>
                    </Col>
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
