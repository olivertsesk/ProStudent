/**
 * Created by jaewonlee on 2018. 2. 9..
 */
import React, { Component } from 'react';
import{
    Col,
    Panel,
    ButtonGroup,
    Button
} from 'react-bootstrap'
import * as data from './../data'
import * as firebase from 'firebase'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight,
            width:window.innerWidth,
            mode:0,
            createAccount:false,
            newAccount: false,
            login:{
                email:"",
                password:"",
                employeeNo:"",
            },
            newUser:{
                firstName:"",
                lastName:"",
            }
        };
        this.main = this.main.bind(this)
        this.panel = this.panel.bind(this)
        this.createID = this.createID.bind(this)
        this.login = this.login.bind(this)
    }
    resize = () => {
        this.setState({width:window.innerWidth,height:window.innerHeight})
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user) {
                if(!firebase.auth().currentUser.displayName){
                    var name = "";
                    if(this.state.newAccount){
                        //alert(this.state.newUser.firstName);
                        //alert(this.state.newUser.lastName);

                        name = "Professor " + this.state.newUser.firstName + " " + this.state.newUser.lastName;
                    }else{
                        name = firebase.auth().currentUser.email;
                    }

                    firebase.auth().currentUser.updateProfile({
                        displayName: name
                    }).then(()=>{
                        //alert(name)
                    }).catch(function(error){
                        //error in changing displayname
                    })
                }

                const adminID = "stpX94g415buRPBTRLCl9jKnbbU2"
                if(adminID == firebase.auth().currentUser.uid){
                    this.props.history.push('/admin/');
                }
                else{
                    this.props.history.push('/prof/');
                }
            }
            else{
                this.props.history.push('/main');
                this.main();
            }
        });

    }
    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    handleButton(i){
        /*firebase.database().ref('classes').orderByChild('course').orderByChild('code').equalTo(this.state.login.email).on("value", function(snapshot) {
            console.log(snapshot.val());
            snapshot.forEach(function(data) {
                console.log(data.key);
            });
        });*/

        if(this.state.mode === 2){
            firebase.database().ref('classes/').orderByChild('course/code').equalTo(this.state.login.email).once("value").then((snapshot)=> {
                console.log(snapshot.val())
                if(!snapshot.val()){
                    alert("FAILED")
                }
                else{
                    snapshot.forEach(childSnapshot => {
                        //console.log(childSnapshot.val().course)
                        for(var i = 0; i<childSnapshot.val().course.listStudent.length;i++){
                            if(this.state.login.password === childSnapshot.val().course.listStudent[i]){
                                data.setID(this.state.login.password)
                                data.setInfo(childSnapshot.val())
                                data.setCourseID(childSnapshot.key)
                                this.props.history.push('/student/');
                            }
                        }
                    });
                }

            })
        }
        else{
            this.login();
        }
    }


    main(){
        return(
            <div class='App' style={{zIndex:1,width:this.state.width,padding:10}}>
                <div style={{height:this.state.height/3,justifyContent:'center'}}>
                    <h1 style={{fontSize:this.state.width>1000?this.state.width/12:50,fontWeight:900,color:"#47525e"}}>ProStudent</h1>
                    <h2 style={{fontSize:this.state.width>1000?this.state.width/60:18,fontWeight:600,fontStyle:'italic',color:"#47525e",padding:0,margin:0,lineHeight:1.3}}>
                        Direct communication between a class & its Prof!
                    </h2>
                    <h3 style={{fontSize:this.state.width>1000?this.state.width/70:18,fontWeight:500,fontStyle:'italic',color:"#47525e",padding:0,margin:0}}>
                        Real-time feedback & consensus evaluation
                    </h3>
                </div>

                <br/>
                <br/>
                <h1 style={{fontSize:this.state.width>1000?this.state.width/40:25,fontWeight:900,color:"#47525e"}}>Who are you?</h1>
                <ButtonGroup>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3.3}} onClick={()=>this.setState({mode:2})}>
                        <p style={{color:'white'}}>Student</p>
                    </Button>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3.3}} onClick={()=>this.setState({mode:3})}>
                        <p style={{color:'white'}}>Professor</p>
                    </Button>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3.3}} onClick={()=>this.setState({mode:4})}>
                        <p style={{color:'white'}}>Admin</p>
                    </Button>
                </ButtonGroup>
                <br/>
                <br/>
            </div>
        )
    }

    panel(mode){
        //mode 1 login
        //mode 2 create account as student
        //mode 3 create account as professor,
        var title = null;
        var topInput = null;
        var bottomInput = null;
        switch(mode){
            case 2:
                title = "Login To Class Portal"
                topInput = "Access Code (Course Code)"
                bottomInput = "Student ID"
                break;
            case 3:
                title = "Login To Professor Account"
                topInput = "Email"
                bottomInput = "Password"
                break;
            case 4:
                title = "Login To Administrator Account"
                topInput = "Username"
                bottomInput = "Password"
                break;
            default:
                break;
        }

            return(
                <div className="center" style={{flexDirection:'column',width:'100%',height:'100%'}}>
                    <p style={{color:"#3D99d4",fontSize:25}}>{title}</p>
                    <hr style={{color:"#B3b3b3",border:'solid',width:'90%',borderWidth:0.5}}/>
                    <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>{topInput}</p>
                    <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                       onChange={(e)=> this.setState({login:{...this.state.login,email:e.target.value}})}
                    />
                    <br/>
                    <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>{bottomInput}</p>
                    <input type='password' style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                       onChange={(e)=> this.setState({login:{...this.state.login,password:e.target.value}})}
                    />
                    <br/>
                <br/>
                <ButtonGroup>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3}} onClick={()=>this.handleButton(this.state.mode)}>
                        <p style={{color:'white'}}>Login</p>
                    </Button>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3}} onClick={()=>this.setState({mode:0,login:{...this.state.login,password:null}})}>
                        <p style={{color:'white'}}>Cancel</p>
                    </Button>
                </ButtonGroup>
                <br/>
                {this.state.mode==3?
                        <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?2*this.state.width/7:2*this.state.width/3}} onClick={()=>this.setState({createAccount:true})}>
                            <p style={{color:'white'}}>Create Account</p>
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
                this.state.newAccount = true;
            }).catch(function(error){
                alert(error);
            });
        }

    login(){
        if(this.state.login.email.length<1){
            alert("Please enter your account information or create an account")
            return;
        }

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
            firebase.auth().signInWithEmailAndPassword(this.state.login.email,this.state.login.password).catch((error)=>alert(error +"... Try loggin in again!"))
        ).catch((error)=>alert(error +"... Try loggin in again!"));

    }

    render() {
        if(this.state.mode==2||this.state.mode===4){
            return (
                <div className="App">
                        <Panel style={{position:'absolute',
                            top:this.state.height/8,
                            left:this.state.width>1000?this.state.width/3:this.state.width/8,
                            width:this.state.width>1000?this.state.width/3:this.state.width*6/8,
                            height:this.state.width>1000?this.state.height*7/8:this.state.height*13/16
                        }}>
                            {this.panel(this.state.mode)}
                        </Panel>
                </div>)
        }else if (this.state.mode === 3){
            return(
                <div className="App">
                    {!this.state.createAccount?
                        <Panel style={{position:'absolute',
                            top:this.state.height/8,
                            left:this.state.width>1000?this.state.width/3:this.state.width/8,
                            width:this.state.width>1000?this.state.width/3:this.state.width*6/8,
                            height:this.state.width>1000?this.state.height*7/8:this.state.height*13/16
                        }}>
                            {this.panel(this.state.mode)}
                        </Panel>
                    :
                        <Panel style={{position:'absolute',
                            top:this.state.height/8,
                            left:this.state.width>1000?this.state.width/3:this.state.width/8,
                            width:this.state.width>1000?this.state.width/3:this.state.width*6/8,
                            height:this.state.width>1000?this.state.height*7/8:this.state.height*13/16
                        }}>
                            <div className="center" style={{flexDirection:'column',width:'100%',height:'100%'}}>
                                <p style={{color:"#3D99d4",fontSize:25}}>Create Professor Account</p>
                                <hr style={{color:"#B3b3b3",border:'solid',width:'90%',borderWidth:0.5}}/>
                                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>First Name</p>
                                <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                                       onChange={(e)=> this.setState({newUser:{...this.state.firstName,firstName:e.target.value}})}
                                />
                                <br/>
                                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>Last Name</p>
                                <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                                       onChange={(e)=> this.setState({newUser:{...this.state.lastName,lastName:e.target.value}})}
                                />
                                <br/>
                                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>Email</p>
                                <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                                       onChange={(e)=> this.setState({login:{...this.state.login,email:e.target.value}})}
                                />
                                <br/>
                                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>Password</p>
                                <input type='password' style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                                       onChange={(e)=> this.setState({login:{...this.state.login,password:e.target.value}})}
                                />
                                <br/>
                                <ButtonGroup>
                                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3}} onClick={()=>this.createID()}>
                                        <p style={{color:'white'}}>Create Account</p>
                                    </Button>
                                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3}} onClick={()=>this.setState({createAccount:false})}>
                                        <p style={{color:'white'}}>Cancel</p>
                                    </Button>
                                </ButtonGroup>

                            </div>
                        </Panel>
                    }


                </div>
                )
        }else{
            return(this.main())
        }
    }
}
export default Main
