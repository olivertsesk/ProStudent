/**
 * Created by jaewonlee on 2018. 2. 9..
 */

import React, { Component } from 'react';
import{
    Navbar,
    Nav,
    NavItem,
    Col,
    Panel
} from 'react-bootstrap'

class NavigationBar extends Component {
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
            <div style={{width:this.state.width}}>
                <div className="background" style={{width:window.innerWidth,height:window.innerHeight,position:'fixed',backgroundImage:'url('+require('./../image/mainbg.jpeg')+')',backgroundSize:'cover',top:0,left:0}}/>
                <Navbar style={{zIndex:10,marginBottom:0,background:"#3d99d4",borderColor:"#8492A6",justifyContent:'center'}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" style={{color:"white", fontWeight:"bold",fontSize:25}}>ProStudent</a>
                        </Navbar.Brand>
                        <Navbar.Toggle style={{background:"rgba(61, 153, 212, 0.2)", fontWeight:"bold"}}/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#" onClick={()=>this.setState({about:true,contactus:false})} style={{color:"#47525e", fontWeight:"bold"}}>
                                <p style={{color:"black", fontWeight:"bold"}}>About</p>
                            </NavItem>
                            <NavItem eventKey={2} href="#" onClick={()=>this.setState({about:false,contactus:true})}>
                                <p style={{color:"black", fontWeight:"bold"}}>Contact Us</p>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;