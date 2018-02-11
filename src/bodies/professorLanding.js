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
import ClassList from './components/listing'

class ProfLanding extends Component {
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
            <div style={{width:this.state.width,height:this.state.height-65,padding:this.state.width>1000?80:10}}>
                <Col lg={8} md={8} sm={8} xs={8} style={{height:'100%',padding:0,background:'white',overflowY:"scroll"}}>
                    <ClassList/>
                    <ClassList/>
                    <ClassList/>
                </Col>
                <Col lg={4} md={4} sm={4} xs={4} style={{height:'100%',padding:0}}>
                    <div className="center" style={{flexDirection:'column',height:"100%",width:'100%',marginLeft:this.state.width>1000?80:10}}>
                        <div className="center" style={{flexDirection:'column',height:"50%",width:'90%',borderColor:'#343f4b',borderRadius:10,border:'solid',background:'white'}}>
                            Manage Account
                        </div>
                        <br style={{height:"10%",width:'90%'}}/>
                        <div className="center" style={{flexDirection:'column',height:"50%",width:'90%',borderColor:'#343f4b',borderRadius:10,border:'solid',background:'white'}}>
                            Manage Classes
                        </div>
                    </div>
                </Col>
            </div>
        );
    }
}

export default ProfLanding;