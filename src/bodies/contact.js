/**
 * Created by Chris Di Betta and Nick Benseler on 2018.3.22..
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

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight,
            width:window.innerWidth
        };
    }
    resize = () => {
        this.setState({width:window.innerWidth,height:window.innerHeight})
    }


    main(){
        return(
            <div class='App' style={{zIndex:1,width:this.state.width}}>
                <div style={{textAlign:'center'}}>
                    <h1 style={{fontSize:this.state.width>1000?this.state.width/20:18,fontWeight:600,color:"#47525e"}}>Contact Us</h1>
                </div>
                <div style={{height:this.state.height/13, textAlign:'left'}}>
                    <h1 style={{fontSize:this.state.width>1000?this.state.width/70:18,fontWeight:500,color:"#47525e",padding:0,marginLeft:100, marginRight: 100}}>
                        <p>

                            If you have any feedback or suggestions regarding ProStudent, we’d love to hear from you.{"\n"}
                        </p>
                        <p>
                            Email:
                        </p>
                        <p>
                            prostudent@prostudent.ca
                        </p>
                        <p>
                            Office:
                        </p>
                        <p>
                            Trottier Engineering Building
                        </p>
                        <p>
                            3630 University
                        </p>
                        <p>
                            Montreal, Quebec
                        </p>
                        <p>
                            H3A 2B2
                        </p>

                    </h1>
                </div>
                <div style={ ({})}>
                    <h2 style={({marginLeft:350, marginTop:150})}>
                        <img style={{justifyContent: 'center', alignItems: 'center', width: 630, height: 360}} src={require('./../image/TrottierMap.png')} alt="trot" className="Trot"/>
                    </h2>
                </div>
            </div>
        )
    }

    render() {
        return(this.main())
    }
}
export default Contact
