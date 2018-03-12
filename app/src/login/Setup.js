/**
 * Created by alessandrofurkim on 11.02.18.
 */
/**
 * Created by alessandrofurkim on 21.11.17.
 */
import React, { Component } from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from "material-ui/FlatButton"
import VerticalLinearStepper from "./stepper"
import Divider from "material-ui/Divider"
import logo from '../icons/react.svg';
import Drawer from 'material-ui/Drawer';


class Setup extends Component {
    constructor(props){
        super(props)
        this.submitLogin = this.submitLogin.bind(this)
        this.state = {
            progress:<div></div>

        }
        console.log(props)
    }
    submitLogin(){
        console.log("AO")
        this.props.onRegister()
    }
    render() {
        const style = {
            height: 500,
            width: 300,
            margin: 0 ,
            textAlign: 'center',
            display: 'inline-block',
        };

        return (
            <div>
                <div className="container-fluid">
                    <div className="col-md-3">
                        <Drawer width={380}>
                            <header className="App-header">
                            </header>
                            <div style={{margin:10}}>
                            <h3>Initial setup</h3></div>
                            <Divider></Divider>
                            <div style={{textAlign:"left",margin:10}}>
                            <VerticalLinearStepper onRegister={this.props.onRegister}></VerticalLinearStepper>
                            </div>
                        </Drawer>
                    </div>
                    <div className="col-md-8">
                        <div className="setup">{this.state.progress}</div>

                    </div>
                </div>
            </div>

        );
    }
}

export default Setup;
