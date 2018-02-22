/**
 * Created by jaewonlee on 2018. 2. 9..
 */

import React, { Component } from 'react';
import{
    Col,
    ButtonGroup,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import {
    Redirect
} from 'react-router-dom';

import CommentList from "./components/studentListing"
import * as data from './../data'

class StudentLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            height:window.innerHeight,
            width:window.innerWidth,
            studentID:null,
            courseInfo:null,
        };
    }

    resize = () => {
        this.setState({width:window.innerWidth,height:window.innerHeight})
    }

    componentWillMount(){

        this.setState({studentID:data.getID(),courseInfo:data.getInfo()})
        this.setState({loading:false})
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }
    render() {
        if(!this.state.courseInfo){
            return(
                <Redirect to={'/main'}/>
            )
        }
        return (
            <div style={{width:'100%',height:this.state.height-65,padding:80}}>
                <Col lg={12} md={12} sm={12} xs={12} style={{height:'100%',padding:0,background:'white',overflowY:"scroll"}}>
                    <div style={{width:'100%',padding:10}}>
                        <h2>Leave your own feedback:</h2>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <DropdownButton title="Tag" id="dropdown-size-large" style={{width:'100%',height:'100%'}}>
                                <MenuItem eventKey="1">Question</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="2">Suggestion</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="3">Compliment</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="4">Complaint</MenuItem>
                            </DropdownButton>
                            <input style={{width:'100%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                                   placeholder="Type here..."/>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                            <ButtonGroup>
                                <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>100?this.state.width/10:this.state.width/2}}>
                                    <p style={{color:'white'}}>Enter</p>
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div>
                        <CommentList item={this.state.courseInfo}/>
                    </div>
                </Col>
            </div>
        )
    }
}

export default StudentLanding;