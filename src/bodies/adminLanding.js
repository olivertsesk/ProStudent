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
 import ClassList from './components/adminListing'
import * as firebase from "firebase";

 class AdminLanding extends Component {
     constructor(props) {
         super(props);
         this.state = {
             height:window.innerHeight,
             width:window.innerWidth,
             classes:[]
         };
     }
     resize = () => {
         this.setState({width:window.innerWidth,height:window.innerHeight})
     }

     componentDidMount() {
         window.addEventListener('resize', this.resize)
         firebase.database().ref('/classes/').on('value',(snapshot) =>{
             var classes =[];
             snapshot.forEach(function(item) {
                 classes.push(item);
             });
             this.setState({classes})
             console.log(classes)
         })
     }

     componentWillUnmount() {
         window.removeEventListener('resize', this.resize)
     }

     render() {
         return (
             <div style={{width:'100%',height:this.state.height-65,padding:80}}>
                 <Col lg={8} md={8} sm={8} xs={12} style={{height:'100%',padding:0,background:'white',overflowY:"scroll"}}>
                     {
                         this.state.classes.map((item,i)=>{
                                 return(
                                     <ClassList item ={item}/>
                                 )
                         })
                     }
                 </Col>
                 <Col lg={4} md={4} sm={4} xs={12} style={{height:'100%',padding:0}}>
                     <div className="center" style={{flexDirection:'column',height:"100%",width:(this.state.width-160)*1/3-90,marginLeft:80,}}>
                         <div className="center" style={{flexDirection:'column',height:"50%",width:'90%',borderColor:'#343f4b',borderRadius:10,border:'solid',background:'white'}}>
                             <p style={{fontSize:30}}>Search</p>
                         </div>
                         <br style={{height:"10%",width:'90%'}}/>
                         <div className="center" style={{flexDirection:'column',height:"50%",width:'90%',borderColor:'#343f4b',borderRadius:10,border:'solid',background:'white'}}>
                             <p style={{fontSize:30}}>See Professor's</p>
                             <p style={{fontSize:30}}>Other Courses</p>
                         </div>
                     </div>
                 </Col>
             </div>
         );
     }
 }

 export default AdminLanding;
