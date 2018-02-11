/**
 * Created by alessandrofurkim on 21.11.17.
 */
import React, { Component } from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from "material-ui/FlatButton"
import Divider from "material-ui/Divider"
import logo from '../icons/react.svg';


class Login extends Component {
    constructor(props){
        super(props)
        this.submitLogin = this.submitLogin.bind(this)

        console.log(props)
    }
    submitLogin(){
        console.log("AO")
        this.props.onLogin()
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
            <div className="Login">
                <div className="container-fluid">
                    <div className="Login">
                        <Paper style={{marginTop:50}} className="Login" zDepth={2} rounded={false} >
                            <div><img className="login-logo" width={200} src={logo}></img></div>
                            <div style={{marginTop:50}}>
                                <Divider></Divider>
                                <TextField hintText="Username" floatingLabelStyle={{color:"#263238"}} floatingLabelFocusStyle={{color:"#C5CAE9"}} underlineFocusStyle={{borderColor:"#C5CAE9"}} f  className="formo_login"></TextField>
                            <TextField hintText="Password" floatingLabelStyle={{color:"#263238"}} underlineFocusStyle={{borderColor:"#C5CAE9"}} floatingLabelFocusStyle={{color:"#C5CAE9"}} type="password" className="formo_login"></TextField>
                            </div>
                            <FlatButton labelStyle={{color:"#263238"}} onClick={()=>this.submitLogin()} style={{marginTop:30,color:"#263238"}} backgroundColor="#C5CAE9" className="login-btn">Sign in</FlatButton>
                        </Paper>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
