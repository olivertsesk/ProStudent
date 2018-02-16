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

const comments = [1,2];

class StudentLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel:false,
            color_blue: false
        };
        this.comment = this.comment.bind(this)
    }

    changeColor(){
        this.setState({color_blue: !this.state.color_blue})
    }

    comment(){
        return(
            <div style={{height:100,border:"solid",borderColor:'#343f4b'}}>
                <Col lg={8} md={8} sm={8} xs={8} className='center' style={{height:'100%',fontSize:15}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat.
                </Col>
                <Col lg={3} md={3} sm={3} xs={3} className='center' style={{height:'100%',fontSize:30}}>
                    Rating: 0
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
                    <Panel style={{width:'100%',height:250}}>
                        <div>
                            {
                                comments.map(()=>this.comment())
                            }
                        </div>
                    </Panel>
                    :
                    null
                }
            </div>
        );
    }
}

export default StudentLanding;
