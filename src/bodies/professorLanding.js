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
import ClassList from './components/classListing'
import ClassManager from './classSettings'
import * as firebase from 'firebase'

var fullClass=[];
var myClass = [];

class ProfLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            height:window.innerHeight,
            width:window.innerWidth,
            classManager:false,
        };
        this.classListFetch = this.classListFetch.bind(this);
    }
    resize = () => {
        this.setState({width:window.innerWidth,height:window.innerHeight})
    }

    componentWillMount(){
        this.setState({loading:true})

        fullClass=[]
        myClass = [];
        this.classListFetch()
    }

    classListFetch(){
        myClass=[]
        firebase.database().ref('/classes').once('value').then((snapshot)=>{
            snapshot.forEach(childSnapshot => {
                if(childSnapshot.val().professor.UID===firebase.auth().currentUser.uid){
                    myClass.push(childSnapshot.val())
                }
            });
            this.setState({loading:false})
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        if(this.state.loading){
            return(<div>
                Loading
            </div>)
        }
        else
        return (
            <div>
                {this.state.classManager?
                    <ClassManager close={()=>this.setState({classManager:false})} fetch={()=>this.classListFetch()}/>
                    :
                    <div style={{width:'100%',height:this.state.height-65,padding:80}}>
                        <Col lg={8} md={8} sm={8} xs={12} style={{height:'100%',padding:0,background:'white',overflowY:"scroll"}}>
                            {myClass.map((item,i)=>{
                                return(
                                    <ClassList item={item} key={i}/>
                                )

                            })}
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={12} style={{height:'100%',padding:0}}>
                            <div className="center" style={{flexDirection:'column',height:"100%",width:(this.state.width-160)*1/3-90,marginLeft:80,}}>
                                <div className="center" style={{flexDirection:'column',height:"50%",width:'90%',borderColor:'#343f4b',borderRadius:10,border:'solid',background:'white'}}>
                                    Manage Account
                                </div>
                                <br style={{height:"10%",width:'90%'}}/>
                                <div className="center" style={{flexDirection:'column',height:"50%",width:'90%',borderColor:'#343f4b',borderRadius:10,border:'solid',background:'white'}}
                                     onClick={()=>this.setState({classManager:true})} >
                                    <img src={require('./../image/add.svg')} style={{width:50,height:50,position:'relative'}}/>
                                    Manage Classes
                                </div>
                            </div>
                        </Col>
                    </div>
                }


            </div>

        );
    }
}

export default ProfLanding;
