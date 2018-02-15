/**
 * Created by jaewonlee on 2018. 2. 10..
 */
import React, { Component } from 'react';
import { RadioGroup, RadioButton, Radio } from 'react-radio-buttons';
import{
    Navbar,
    Nav,
    NavItem,
    Col,
    Panel
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
        return(
          <div style={{height:100,border:"solid",borderColor:'#343f4b'}}>
              <Col lg={6} md={6} sm={6} xs={6} className='center' style={{height:'100%',fontSize:15}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. 
                  Morbi nec lacus condimentum, hendrerit mi eu, feugiat.
              </Col>
              <Col lg={3} md={3} sm={3} xs={3} className='center' style={{height:'100%',fontSize:30,color:'#343f4b'}}>
                        <RadioGroup name="rating" onChange={this.handleChange}>
                            <Radio value="up" >Agree</Radio>
                            <Radio value="down" >Disagree</Radio>
                        </RadioGroup>
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
                        <p style={{width:'100%'}}>Student Feedback</p>
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

export default StudentListing;
