/**
 * Created by MrCerealKiller on 2018. 2. 9..
 */
import React, { Component } from 'react';
import{
    Navbar,
    Nav,
    NavItem,
    Col,
    Panel
} from 'react-bootstrap'
import ClassList from './components/listing'

// import './styles/classSettings.js'

class ClassSettings extends Component {

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

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }
    render() {
        return (
            <div className='mainDivStyle' style={{width:'100%',height:this.state.height-90}}>
                <table className="settings-table" style={{ width:this.state.width-160, margin:'80px'}}>
                    <tr>
                      <th colspan="3" className="settings-table-header">Your Classes</th>
                    </tr>
                    <tbody>
                        <tr className="settings-table-row">
                          <td className="settings-table-cell" style={{width:'90%'}}>Class 1</td>
                          <td className="settings-table-cell clickable">Edit</td>
                          <td className="settings-table-cell clickable">Delete</td>
                        </tr>
                        <tr className="settings-table-row">
                            <td className="settings-table-cell clickable" colspan="3">Add Class</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ClassSettings;
