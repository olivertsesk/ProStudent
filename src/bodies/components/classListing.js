/**
 * Created by jaewonlee on 2018. 2. 14..
 */
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

class ClassListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel:false,
            color_blue: false,
            comments:[]
        };
        this.comment = this.comment.bind(this)
    }

    changeColor(){
        this.setState({color_blue: !this.state.color_blue})
    }

    componentDidMount(){
        firebase.database().ref('/classes/'+this.props.item.key+'/feedback').on('value',(snapshot) =>{
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

    comment(item,i){
        return(
            <div style={{height:100,border:"solid",borderColor:'#343f4b'}}>
                <Col lg={2} md={2} sm={2} xs={2} className='center' style={{height:'100%',fontSize:15}}>
                    <p>{item.val().tag?item.val().tag:"No Tag"}</p>
                </Col>
                <Col lg={8} md={8} sm={8} xs={8} className='center' style={{height:'100%',fontSize:15}}>
                    {item.val().comment}
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className='center' style={{height:'100%',fontSize:25}}>
                    <p>Rating: {this.getRating(item)}</p>
                </Col>
            </div>
        )
    }

    render() {
        let bgColor = this.state.color_blue ? "#3D99D4" : "white"
        return (
            <div>
                <div style={{height:150,border:"solid",borderColor:'#343f4b', background: bgColor}} onClick={()=>this.setState({showPanel:!this.state.showPanel}, this.changeColor.bind(this))}>
                    <Col lg={3} md={3} sm={3} xs={3} className='center' style={{height:'100%',fontSize:20}}>
                        <p style={{width:'100%'}}>{this.props.item.val().course.code}</p>
                    </Col>
                    <Col lg={9} md={9} sm={9} xs={9} className='center' style={{height:'100%',fontSize:30}}>
                        <p style={{width:'100%'}}>{this.props.item.val().course.title}</p>
                    </Col>
                </div>
                {this.state.showPanel?
                    <div>
                        {
                            //comments.map((item,i)=>this.comment(item,i))
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

export default ClassListing;
