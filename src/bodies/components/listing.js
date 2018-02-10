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

class StudentLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel:false
        };
    }


    render() {
        return (
            <div>
                <div style={{height:150,border:"solid",borderColor:'#343f4b'}} onClick={()=>this.setState({showPanel:!this.state.showPanel})}>
                    <Col lg={7} md={7} sm={7} xs={7} className='center' style={{height:'100%',fontSize:30}}>
                        <p style={{width:'100%'}}>ECSE 321</p>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1} className='center' style={{height:'100%',fontSize:30}}>
                        [0]
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4} className='center' style={{height:'100%',fontSize:30}}>
                        Unread Comments
                    </Col>
                </div>
                {this.state.showPanel?
                    <Panel style={{width:'100%',height:300}}>
                        
                    </Panel>
                    :
                    null
                }
            </div>
        );
    }
}

export default StudentLanding;