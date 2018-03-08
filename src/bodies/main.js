/**
 * Created by jaewonlee on 2018. 2. 9..
 */
import React, { Component } from 'react';
import{ Panel, ButtonGroup, Button } from 'react-bootstrap';

import * as data from './../data';
import * as firebase from 'firebase';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
      mode: 0,
      createAccount: false,
      newAccount: false,
      login: {
        email: "",
        password: ""
      },
      newUser: {
        firstName: "",
        lastName: "",
      }
    };

    this.main = this.main.bind(this)
    this.panel = this.panel.bind(this)
    this.createID = this.createID.bind(this)
    this.login = this.login.bind(this)
  }

  resize = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        if (!firebase.auth().currentUser.displayName) {
          var name = "";

          if (this.state.newAccount) {
            name = "Professor " + this.state.newUser.firstName + " " + this.state.newUser.lastName;
          } else {
            name = firebase.auth().currentUser.email;
          }

          firebase.auth().currentUser.updateProfile({displayName: name}).then(()=>{
          }).catch(function(error) {
            //error in changing displayname
          });
        }

        const adminID = "stpX94g415buRPBTRLCl9jKnbbU2"
        if (adminID === firebase.auth().currentUser.uid) {
          this.props.history.push('/admin/');
        } else if (firebase.auth().currentUser.uid) {
          this.props.history.push('/prof/');
        }
      } else {
        this.props.history.push('/main');
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleButton(i){
    if (this.state.mode === 2) {
      firebase.database().ref('classes/').orderByChild('course/code').equalTo(this.state.login.email).once("value").then((snapshot)=> {
        // console.log(snapshot.val());
        if (!snapshot.val()) {
          alert("FAILED");
        } else {
          snapshot.forEach(childSnapshot => {
            for(var i = 0; i < childSnapshot.val().course.listStudent.length; i++) {
              if (this.state.login.password === childSnapshot.val().course.listStudent[i]) {
                data.setID(this.state.login.password);
                data.setInfo(childSnapshot.val());
                data.setCourseID(childSnapshot.key);
                this.props.history.push('/student/');
              }
            }
          });
        }
      })
    } else {
      this.login();
    }
  }

  main(){
    return(
      <div className="homewrapper" style={{width:this.state.width}}>
        <div className="homeheader" style={{height:this.state.height/3}}>
          <h1>ProStudent</h1>
          <h2>Direct Communication Between a Class and their Professor</h2>
          <h3>Provides Real-time Feedback and Consensus Evaluation</h3>
        </div>

        <br/>
        <br/>

        <div className="loginwrapper">
          <h1>Who are you?</h1>
          <ButtonGroup>
            <Button bsSize="large" className="loginbutton" style={{width: this.state.width/3.3}} onClick={()=>this.setState({mode:2})}>
              <p>Student</p>
            </Button>
            <Button bsSize="large" className="loginbutton" style={{width: this.state.width/3.3}} onClick={()=>this.setState({mode:3})}>
              <p>Professor</p>
            </Button>
            <Button bsSize="large" className="loginbutton" style={{width: this.state.width/3.3}} onClick={()=>this.setState({mode:4})}>
              <p>Admin</p>
            </Button>
          </ButtonGroup>
        </div>

        <br/>
        <br/>

      </div>
    )
  }

  panel(mode) {
    //mode 1 login
    //mode 2 create account as student
    //mode 3 create account as professor,
    var title = null;
    var topInput = null;
    var bottomInput = null;
    switch(mode) {
      case 2:
        title = 'Login To Class Portal';
        topInput = 'Access Code (Course Code)';
        bottomInput = 'Student ID';
        break;
      case 3:
        title = 'Login To Professor Account';
        topInput = 'Email';
        bottomInput = 'Password';
        break;
      case 4:
        title = 'Login To Administrator Account';
        topInput = 'Username';
        bottomInput = 'Password';
        break;
      default:
        // Do nothing
        break;
    }

    return (
      <div className="center form" style={{flexDirection:'column'}}>
        <p className="title">{title}</p>
        <hr className="formseperator"/>

        <p className="formlabel">{topInput}</p>
        <input className="forminput" onChange={(e)=> this.setState({login:{...this.state.login, email: e.target.value}})}/>

        <br/>

        <p className="formlabel">{bottomInput}</p>
        <input type='password' className="forminput" onChange={(e)=> this.setState({login: {...this.state.login, password: e.target.value}})}/>

        <br/>
        <br/>

        <ButtonGroup>
          <Button bsSize="large" className="loginbutton" style={{width: this.state.width/3}} onClick={()=>this.handleButton(this.state.mode)}>
            <p>Login</p>
          </Button>
          <Button bsSize="large" className="loginbutton" style={{width: this.state.width/3}} onClick={()=>this.setState({mode: 0, login: {...this.state.login, password: null}})}>
            <p>Cancel</p>
          </Button>
        </ButtonGroup>

        <br/>

        {
          this.state.mode === 3 ?
            <Button bsSize="large" className="loginbutton" style={{width: this.state.width/3}} onClick={()=>this.setState({createAccount: true})}>
              <p>Create Account</p>
            </Button>
          :
            null
        }
      </div>
    )
  }

  createID(type) {
    firebase.auth().createUserWithEmailAndPassword(this.state.login.email, this.state.login.password).then(()=>{
      alert('Your account has been created');
      this.setState({newAccount:true});
    }).catch(function(error) {
      alert(error);
    });
  }

  login(){
    if(this.state.login.email.length < 1) {
      alert("Please enter your account information or create an account");
      return;
    }

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
    firebase.auth().signInWithEmailAndPassword(this.state.login.email,this.state.login.password).catch((error)=>alert(error +"... Try loggin in again!"))
    ).catch((error)=>alert(error +"... Try loggin in again!"));
  }

  render() {
    if(this.state.mode === 2 || this.state.mode === 4) {
      return (
        <div className="App">
          <Panel style={{position:'absolute',
            top:this.state.height/8,
            left:this.state.width>1000?this.state.width/3:this.state.width/8,
            width:this.state.width>1000?this.state.width/3:this.state.width*6/8,
            height:this.state.width>1000?this.state.height*7/8:this.state.height*13/16}}>
            {this.panel(this.state.mode)}
          </Panel>
        </div>
      )
    } else if (this.state.mode === 3) {
      return (
        <div className="App">
          {
            !this.state.createAccount ?
              <Panel style={{position:'absolute',
                top:this.state.height/8,
                left:this.state.width>1000?this.state.width/3:this.state.width/8,
                width:this.state.width>1000?this.state.width/3:this.state.width*6/8,
                height:this.state.width>1000?this.state.height*7/8:this.state.height*13/16}}>
                {this.panel(this.state.mode)}
              </Panel>
            :
              <Panel style={{position:'absolute',
                top:this.state.height/8,
                left:this.state.width>1000?this.state.width/3:this.state.width/8,
                width:this.state.width>1000?this.state.width/3:this.state.width*6/8,
                height:this.state.width>1000?this.state.height*7/8:this.state.height*13/16}}>

                <div className="center form" style={{flexDirection:'column'}}>
                  <p className="title">Create Professor Account</p>
                  <hr className="formseperator"/>

                  <p className="formlabel">First Name</p>
                  <input className="forminput" onChange={(e)=> this.setState({newUser: {...this.state.newUser, firstName: e.target.value}})}/>

                  <br/>

                  <p className="formlabel">Last Name</p>
                  <input className="forminput" onChange={(e)=> this.setState({newUser: {...this.state.newUser, lastName: e.target.value}})}/>

                  <br/>

                  <p className="formlabel">Email</p>
                  <input className="forminput" onChange={(e)=> this.setState({login: {...this.state.login, email: e.target.value}})}/>

                  <br/>

                  <p className="formlabel">Password</p>
                  <input type='password' className="forminput" onChange={(e)=> this.setState({login: {...this.state.login, password: e.target.value}})}/>

                  <br/>
                  <br/>

                  <ButtonGroup>
                    <Button bsSize="large" className="loginbutton" style={{width:this.state.width/3}} onClick={()=>{this.createID()}}>
                      <p>Create Account</p>
                    </Button>
                    <Button bsSize="large" className="loginbutton" style={{width:this.state.width/3}} onClick={()=>this.setState({createAccount: false})}>
                      <p>Cancel</p>
                    </Button>
                  </ButtonGroup>

                </div>
              </Panel>
            }
          </div>
        )
      } else {
        return(this.main())
      }
    }
}

export default Main
