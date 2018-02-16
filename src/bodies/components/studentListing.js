/**
 * Created by jaewonlee on 2018. 2. 10..
 */
import React, { Component } from 'react';
import{
    Navbar,
    Nav,
    NavItem,
    Col,
    Panel,
    Radio
} from 'react-bootstrap'

const comments = [1,2];

class StudentListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel:false
        };
        this.comment = this.comment.bind(this)
    }


    comment(){
        var up = 6;
        var down = 2;
        return(
            <div style={{height:100,border:"solid",borderColor:'#343f4b'}}>
                <Col lg={6} md={6} sm={6} xs={6} className='center' style={{height:'100%',fontSize:15}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum.
                    Morbi nec lacus condimentum, hendrerit mi eu, feugiat.
                </Col>
                <Col lg={4} md={4} sm={4} xs={4} className='center' style={{height:'100%',fontSize:30,color:'#343f4b'}}>

                    <Radio value="up" onClick={()=>{up++}}>
                        <img src={require('./../../image/thumbs_up.png')} style={{width:40,height:40}}/>
                        <p>[{up}]</p>
                    </Radio>
                    <div style={{width:'10%'}}/>
                    <Radio value="down" onClick={()=>{down++}}>
                        <img src={require('./../../image/thumbs_down.png')} style={{width:40,height:40}}/>
                        <p>[{down}]</p>
                    </Radio>
                </Col>
                <Col lg={1} md={1} sm={1} xs={1} className='center' style={{height:'100%',fontSize:30,color:'#343f4b'}}>
                    <p>Rating:{up-down}</p>
                </Col>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div style={{height:150,border:"solid",borderColor:'#343f4b'}} onClick={()=>this.setState({showPanel:!this.state.showPanel})}>
                    <Col lg={7} md={7} sm={7} xs={7} className='center' style={{height:'100%',fontSize:30}}>
                        <p style={{width:'100%'}}>ECSE 428:</p>
                    </Col>
                    <Col lg={5} md={5} sm={5} xs={5} className='center' style={{height:'100%',fontSize:20}}>
                        <p style={{width:'100%'}}>Lecture 1 (1/8/2018)</p>
                    </Col>
                </div>
                {this.state.showPanel?
                    <Panel style={{position:'relative',width:'100%',height:250}}>
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

export default StudentListing;
