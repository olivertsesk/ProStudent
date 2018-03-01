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
    }

    componentWillMount(){

        firebase.database().ref('/classes/'+data.getCourseID()+'/feedback').on('value',(snapshot) =>{
            var comments = this.state.comments;
            comments =[];
            snapshot.forEach(function(item) {
                comments.push(item);
            });
            this.setState({comments})
        })
        console.log(this.props)
    }

    upvote(item){

        var original_list;
        if(item.val().list!==null && item.val().list !==undefined){
            original_list= item.val().list;
        }
        else original_list = [];
        original_list.push(data.getID());
        firebase.database().ref('/classes/'+data.getCourseID()+'/feedback/'+item.key).update({
            list:original_list
        }).then(()=>{
            alert("voted");
        }).catch(()=>{
            alert("error in voting")
        })
    }

    comment(item,i){
        var list = item.val().list;
        var myID = data.getID();
        var isExisting = false;
        if(list!==null && list !==undefined){
            for(var i =0; i<list.length; i++){
                if(list[i]===myID){
                    isExisting = true;
                    break;
                }
            }
        }

        return(
            <div style={{height:100,border:"solid",borderColor:'#343f4b'}} key ={i}>
                <Col lg={10} md={10} sm={10} xs={10} className='center' style={{height:'100%',fontSize:15}}>
                    {item.val().comment}
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className='center' style={{height:'100%',fontSize:30,color:'#343f4b'}}>
                    <Button onClick={()=>this.upvote(item)} active={!isExisting}>
                        <img src={require('./../../image/thumbs_up.png')} style={{width:40,height:40}}/>
                        <p>{item.val().list?item.val().list.length:0}</p>
                    </Button>
                </Col>

            </div>
        )
    }

    render() {
        return (
            <div>
                <div style={{height:150,border:"solid",borderColor:'#343f4b'}} onClick={()=>this.setState({showPanel:!this.state.showPanel})}>
                    <Col lg={7} md={7} sm={7} xs={7} className='center' style={{height:'100%',fontSize:30}}>
                        <p style={{width:'100%'}}>{this.props.item.course.code}{" "+this.props.item.course.title}</p>
                    </Col>
                    <Col lg={5} md={5} sm={5} xs={5} className='center' style={{height:'100%',fontSize:20}}>
                        <p style={{width:'100%'}}></p>
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
