/**
 * Created by MrCerealKiller on 2018. 2. 9..
 */
import React, { Component } from 'react';
import{
    Navbar,
    Nav,
    NavItem,
    Col,
    Panel,
    ButtonGroup,
    Button
} from 'react-bootstrap'
import ClassList from './components/listing'

class ClassSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight,
            width:window.innerWidth,
            mode:0,
            form:{
                courseCode:null,
                endDate:null,
                ids:null
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

    panel(mode){
        var title = null;
        switch(mode){
            case 1:
                title = "Add Class"
                break;
            case 2:
                title = "Edit Class"
                break;
            case 3:
                title = "Delete Class"
                break;
            default:
                break;
        }
        return(
            <div className="center" style={{flexDirection:'column',width:'100%',height:'100%'}}>
                <p style={{color:"#3D99d4",fontSize:20}}>{title}</p>
                <hr style={{color:"#B3b3b3",border:'solid',width:'90%',borderWidth:0.5}}/>


                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>Course Code</p>
                <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                       onChange={(e)=> this.setState({form:{...this.state.form,courseCode:e.target.value}})} placeholder="ECSE XXX"/>

                <br/>

                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>End Date (DDMMYYYY)</p>
                <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                       onChange={(e)=> this.setState({form:{...this.state.form,endDate:e.target.value}})} placeholder="DDMMYYYY"/>

                <br/>

                <p style={{padding:0,margin:0,lineHeight:1.3,fontSize:20,width:'80%',textAlign:'left'}}>Student IDs (Separate by commas)</p>
                <input style={{width:'80%',border:'none',border:'solid',borderWidth:2,color:'black',borderColor:'#B3b3b3',fontSize:20,outline:'none',boxShadow:'none',borderRadius:5,padding:10}}
                       onChange={(e)=> this.setState({form:{...this.state.form,ids:e.target.value}})}/>

                <br/>

                <ButtonGroup>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3}}>
                        <p style={{color:'white'}}>Add Class</p>
                    </Button>
                    <Button bsSize="large" style={{background:"#3d99d4",width:this.state.width>1000?this.state.width/7:this.state.width/3}} onClick={()=>this.setState({mode:0})}>
                        <p style={{color:'white'}}>Cancel</p>
                    </Button>
                </ButtonGroup>

            </div>
        )
    }

    main() {
        return (
            <div className='mainDivStyle' style={{width:'100%',height:this.state.height-90}}>
                <table className="settings-table" style={{ width:this.state.width-160, margin:'80px'}}>
                    <tr>
                      <th colspan="3" className="settings-table-header">Your Classes</th>
                    </tr>
                    <tbody>
                        <tr className="settings-table-row">
                          <td className="settings-table-cell" style={{width:'90%'}}>Class 1</td>
                          <td className="settings-table-cell clickable" onClick={()=>this.setState({mode:2})}>Edit</td>
                          <td className="settings-table-cell clickable" onClick={()=>this.setState({mode:3})}>Delete</td>
                        </tr>
                        <tr className="settings-table-row">
                            <td className="settings-table-cell clickable" colspan="3"  onClick={()=>this.setState({mode:1})}>Add Class</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                {
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

export default ClassSettings;
