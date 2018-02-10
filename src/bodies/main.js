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

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight,
            width:window.innerWidth,
            mode:0,
            login:{
                email:null,
                password:null,
                employeeNo:null,
            }
        };
        this.main = this.main.bind(this)
        this.panel = this.panel.bind(this)
    }
    resize = () => {
        this.setState({width:window.innerWidth,height:window.innerHeight})
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    handleButton(i){
        switch(i){
            case 1:
                this.props.history.push('/student/')
                break;
            case 2:
                this.props.history.push('/prof/')
                break;
            case 3:
                this.props.history.push('/admin/')
                break;
        }
    }


    main(){
        return(
            <div style={{zIndex:1,width:this.state.width,padding:10}}>
                <div style={{height:this.state.height/3,display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                    <h1 style={{fontSize:this.state.width>1000?this.state.width/20:50,fontWeight:900,color:"#47525e"}}>ProStudent</h1>
                    <h2 style={{fontSize:this.state.width>1000?this.state.width/80:18,fontWeight:600,fontStyle:'italic',color:"#47525e",padding:0,margin:0,lineHeight:1.3}}>
                        Direct communication between a class & profs
                    </h2>
                    <h3 style={{fontSize:this.state.width>1000?this.state.width/80:18,fontWeight:500,fontStyle:'italic',color:"#47525e",padding:0,margin:0}}>
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

                <p>Temp Buttons need to be substituted later implementation of logged in users</p>
                <ButtonGroup>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3.3}} onClick={()=>this.handleButton(1)}>
                        <p style={{color:'white'}}>Student</p>
                    </Button>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3.3}} onClick={()=>this.handleButton(2)}>
                        <p style={{color:'white'}}>Professor</p>
                    </Button>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3.3}} onClick={()=>this.handleButton(3)}>
                        <p style={{color:'white'}}>Admin</p>
                    </Button>
                </ButtonGroup>

                <br/>
                <br/>
                <b>Already have an account?</b>
                <br/>
                <br/>
                <Button bsSize="large" style={{background:"rgba(255,255,255,0.3)",border:'none',width:this.state.width>1000?this.state.width/7:this.state.width/3}} onClick={()=>this.setState({mode:1})}>
                    <b style={{color:'#3d99d4',outline:'none',textShadow:'none'}}>Sign In</b>
                </Button>
            </div>
        )
    }

    panel(mode){
        //mode 1 login
        //mode 2 create account as student
        //mode 3 create account as professor,
        var title = null;
        switch(mode){
            case 1:
                title = "Sign into your account"
                break;
            case 2:
                title = "Create a Student account"
                break;
            case 3:
                title = "Create a Professor account"
                break;
            case 4:
                title = "Admin Login"
                break;
            defaul:
                break;
        }
        return(
            <div className="center" style={{flexDirection:'column',width:'100%',height:'100%'}}>
                <p style={{color:"#3D99d4",fontSize:20}}>{title}</p>
                <hr style={{color:"#B3b3b3",border:'solid',width:'90%',borderWidth:0.5}}/>
                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>Email</p>
                <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                       onChange={(e)=> this.setState({login:{...this.state.login,email:e.target.value}})}
                       placeholder="example@mail.mcgill.ca"
                />
                <br/>
                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>Password</p>
                <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                       onChange={(e)=> this.setState({login:{...this.state.login,password:e.target.value}})}
                />
                <br/>
                {mode==4?
                    <div style={{width:'80%'}}>
                        <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'100%',textAlign:'left'}}>Employee No</p>
                        <input style={{width:'100%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                               onChange={(e)=> this.setState({login:{...this.state.login,password:e.target.value}})}
                        />
                        <br/>
                    </div>
                    :null
                }

                <br/>
                <ButtonGroup>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3}}>
                        <p style={{color:'white'}}>Sign In</p>
                    </Button>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3}} onClick={()=>this.setState({mode:0,login:{...this.state.login,password:null}})}>
                        <p style={{color:'white'}}>Cancel</p>
                    </Button>
                </ButtonGroup>

            </div>
        )
    }

    render() {
        return (
            <div className="App">
                {
                    //mode 1 login
                    //mode 2 create account as student
                    //mode 3 create account as professor,
                    (this.state.mode===1||this.state.mode===2||this.state.mode===3||this.state.mode===4)?
                    <Panel style={{position:'absolute',
                        top:this.state.height/8,
                        left:this.state.width>1000?this.state.width/3:this.state.width/8,
                        width:this.state.width>1000?this.state.width/3:this.state.width*6/8,
                        height:this.state.width>1000?this.state.height*3/4:this.state.height*6/8
                    }}>
                        {this.panel(this.state.mode)}
                    </Panel>
                    :this.main()
                }
            </div>
        );
    }
}
export default Main

