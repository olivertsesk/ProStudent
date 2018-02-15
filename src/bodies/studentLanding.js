/**
 * Created by jaewonlee on 2018. 2. 9..
 */

import React, { Component } from 'react';
import{
    Navbar,
    Nav,
    NavItem,
    Col,
    Panel,
    ButtonGroup,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import CommentList from "./components/studentListing"

class StudentLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight,
            width:window.innerWidth
        };
    }
    resize = () => {
        this.setState({width:window.innerWidth,height:window.innerHeight})
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }
    render() {
        return (
            <div style={{width:'100%',height:this.state.height-65,padding:80}}>
                <Col lg={8} md={8} sm={8} xs={12} style={{height:'100%',padding:0,background:'white',overflowY:"scroll"}}>
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
                        <CommentList/>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={4} xs={12} style={{height:'100%',padding:0}}>
                    <div className="center" style={{flexDirection:'column',height:"100%",width:(this.state.width-160)*1/3-90,marginLeft:80,}}>
                        <div className="center" style={{flexDirection:'column',height:"50%",width:'90%',borderColor:'#343f4b',borderRadius:10,border:'solid',background:'white'}}>
                            <h3>McGill Student Id</h3>
                        </div>
                        <br style={{height:"10%",width:'90%'}}/>
                        <div className="center" style={{flexDirection:'column',height:"50%",width:'90%',borderColor:'#343f4b',borderRadius:10,border:'solid',background:'white'}}>
                            <h3>Course Description</h3>
                        </div>
                    </div>
                </Col>
            </div>
        )
    }
}

export default StudentLanding;