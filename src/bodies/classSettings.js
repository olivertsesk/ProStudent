/**
 * Created by MrCerealKiller on 2018. 2. 9..
 */
import React, { Component } from 'react';
import { ButtonGroup, Button, Panel } from 'react-bootstrap';

import * as firebase from 'firebase'

var fullListClasses = [];

class ClassSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:window.innerHeight,
      width:window.innerWidth,
      mode:0,
      loading:false,
      form: {
        title:null,
        courseCode:null,
        endDate:null,
        ids:null
      },
      classes:[],
      selectedClass:null
    };

    this.classDetail = this.classDetail.bind(this)
    this.panel = this.panel.bind(this)
    this.createClass = this.createClass.bind(this)
  }

  resize = () => {
    this.setState({width:window.innerWidth,height:window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.setState({loading:true});
    var classesTemp = [];
    if(!firebase.auth().currentUser ||
       !firebase.auth().currentUser.uid ||
       firebase.auth().currentUser === null ||
       firebase.auth().currentUser === undefined) {
      this.props.history.push('/');
    } else {
      firebase.database().ref('/classes').orderByChild('professor/UID').equalTo(firebase.auth().currentUser.uid).on('value',(snapshot)=>{

        //console.log(snapshot.val())
        snapshot.forEach(item => {
          classesTemp.push(item);
        });

        this.setState({loading:false,classes:classesTemp});
        this.forceUpdate();
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  createClass(){
    if(this.state.mode === 1) {
      fullListClasses =[];
      firebase.database().ref('/classes').once('value').then((snapshot)=>{
        snapshot.forEach(childSnapshot => {
          fullListClasses.push(childSnapshot.val().course.code);
        });

        var isExisting = false;
        // console.log(this.state.form.courseCode)
        fullListClasses.forEach(code=>{
          // console.log(code===this.state.form.courseCode)
          if (code === this.state.form.courseCode) {
            isExisting = true;
          }
        })

        if (!isExisting) {
          var idList = this.state.form.ids.split(",");
          firebase.database().ref('/classes/').push({
            professor:{
              UID:firebase.auth().currentUser.uid,
              name:firebase.auth().currentUser.displayName
            },
            course:{
              title:this.state.form.title,
              code:this.state.form.courseCode,
              listStudent:this.state.form.ids,
            }
          }).then(()=>{

          this.setState({mode:0})}).catch(()=>{
            alert("Failed")
          })
        } else {
          alert("Session with same course code exists... Cannot be created!")
        }
      }).then(()=>{
        alert("Course added to the system!");
        this.setState({mode:0});
      }).catch(()=>{
        alert("Failed")
      })
    } else {
      //Update Class
    }
  }

  panel(mode, item) {
    var header = null;
    var titleTemp;
    var courseCodeTemp;
    var idsTemp;
    switch (mode) {
      case 1:
        header = "Add Class";
        titleTemp = "Course Title";
        courseCodeTemp = "ECSE XXX";
        idsTemp = "260******,260*****,...";
        break;
      case 2:
        header = "Edit Class";
        titleTemp = item.val().course.title;
        courseCodeTemp = item.val().course.code;
        idsTemp = this.commaSeparatedIDs(item);;
        break;
      default:
        break;
    }

    return(
      <div className="center form" style={{flexDirection:'column'}}>

        <p className="title">{header}</p>
        <hr className="formseperator"/>

        <p className="formlabel">Course Title </p>
        <input className="forminput" onChange={(e)=> this.setState({form: {...this.state.form, title: e.target.value}})} placeholder={titleTemp}/>

        <br/>

        <p className="formlabel">Course Code</p>
        <input className="forminput" onChange={(e)=> this.setState({form: {...this.state.form, courseCode: e.target.value}})} placeholder={courseCodeTemp}/>

        <br/>

        <p className="formlabel">End Date (DDMMYYYY)</p>
        <input className="forminput" onChange={(e)=> this.setState({form: {...this.state.form, endDate: e.target.value}})} placeholder="DDMMYYYY"/>

        <br/>

        <p className="formlabel">Student IDs (Separate by commas)</p>
        <input className="forminput" onChange={(e)=> this.setState({form: {...this.state.form, ids: e.target.value}})} placeholder={idsTemp}/>

        <br/>

        <ButtonGroup>
          <Button bsSize="large" className="loginbutton" style={{width:this.state.width/3}} onClick={()=>this.createClass({mode})}>
            <p>{header}</p>
          </Button>
          <Button bsSize="large" className="loginbutton" style={{width:this.state.width/3}} onClick={()=>this.setState({mode:0})}>
            <p>Cancel</p>
          </Button>
        </ButtonGroup>
      </div>
    )
  }

  classDetail(item){
    return(
      <tbody style={{width:'100%'}}>
        <tr className="settings-table-row">
          <td className="settings-table-cell" style={{width:'20%'}}>{item.val().course.code}</td>
          <td className="settings-table-cell" style={{width:'70%'}}>{item.val().course.title}</td>
          <td className="settings-table-cell clickable" onClick={()=>this.openPortal(item)}>Access Code</td>
          <td className="settings-table-cell clickable" onClick={()=>{this.setState({mode:2,selectedClass:item});}}>Edit</td>
          <td className="settings-table-cell clickable" onClick={()=>{
            var del = window.confirm("Are you sure you'd like to delete " + item.val().course.code +"?");
            if (del) {
              this.deletePortal(item);
            }
            }}>Delete</td>
        </tr>
      </tbody>
    )
  }


  render() {
    return (
      <div>
      {
        this.state.mode != 0 ?
          <Panel style={{position:'absolute',
            top:this.state.height/8,
            left:this.state.width>1000?this.state.width/3:this.state.width/8,
            width:this.state.width>1000?this.state.width/3:this.state.width*6/8,
            height:this.state.width>1000?this.state.height*7/8:this.state.height*13/16}}>
            {this.panel(this.state.mode, this.state.selectedClass)}
          </Panel>
        :
          <div style={{width:this.state.width-160,margin:80}}>
            <img className="close-button" src={require('./../image/delete.svg')} alt="close" onClick={()=>this.props.close()}/>
            <div className="center" style={{padding:30,color:'white',background:"#3d99d4",fontSize:18,fontFamily:'helvetica'}}>
              Your Classes
            </div>

            <table className="settings-table-wrapper">
            {
              this.state.classes.map((item)=>this.classDetail(item))
            }
              <tr className="settings-table-row">
                <td className="settings-table-cell clickable" colspan="5"  onClick={()=>this.setState({mode:1})}>Add Class</td>
              </tr>
            </table>
          </div>
        }
      </div>
    );
  }

  openPortal(item){
    alert("Portal Access Code: " + item.val().course.code);
  }

  //Doesn't remove classListing from UI yet...
  deletePortal(item){
    firebase.database().ref('/classes/'+item.key).remove(()=>alert('Class Removed')).catch(()=>("Class Couldn't Be Removed"));
  }

  //Not working yet
  commaSeparatedIDs(item){
    var idList;
    var idString;
    firebase.database().ref('/classes/'+item.key).on('value',(snapshot) =>{
      var idList = item.val().course.listStudent;
      var idString = idList[0];

      snapshot.forEach(function(item) {
        for(var i = 1; i < idList.length; i++){
          idString.concat(",").concat(idList[i]);
        }
      });
    });

    return(idString);
  }
}

export default ClassSettings;
