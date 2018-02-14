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

class AdminListing extends Component {
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
              <Col lg={3} md={3} sm={3} xs={3} className='center' style={{height:'100%',fontSize:15}}>
                  <p style={{width:'100%'}}>John Doe</p>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='center' style={{height:'100%',fontSize:15}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt congue ligula in rutrum. Morbi nec lacus condimentum, hendrerit mi eu, feugiat.
              </Col>
              <Col lg={3} md={3} sm={3} xs={3} className='center' style={{height:'100%',fontSize:15}}>
                  Up and Down
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
                    <Col lg={4} md={4} sm={4} xs={4} className='center' style={{height:'100%',fontSize:30}}>
                        Prof. Jane Smith
                    </Col>
                </div>
                {this.state.showPanel?
                    <Panel style={{width:'100%',height:250}}>
                        <div style={{height:50}}>
                          <Col lg={4} md={4} sm={4} xs={4}>
                              Top Commments
                          </Col>
                          <Col lg={4} md={4} sm={4} xs={4}/>
                          <Col lg={4} md={4} sm={4} xs={4}>
                            Go to class Page
                          </Col>
                        </div>
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

export default AdminListing;
