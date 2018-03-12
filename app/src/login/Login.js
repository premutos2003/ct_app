/**
 * Created by alessandrofurkim on 21.11.17.
 */
import React, { Component } from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from "material-ui/FlatButton"
import Divider from "material-ui/Divider"
import logo from '../logo.svg';
import axios from "axios"

class Login extends Component {
    constructor(props){
        super(props)
        this.submitLogin = this.submitLogin.bind(this)
        this.state = {
            user:{name:"",pw:""},
            error_user:"",
            error_pw:""
        }
        console.log(props)
    }
    submitLogin(){
        this.props.onLogin(this.state.user)
    }
    handleChange=(e,type)=>{
        const value = e.target.value;
        let user = this.state.user
        user[type]=value
        this.setState({
            user:user
        })
    }
    validateLogin=()=>{
        axios.get("http://localhost:3000/login?user="+this.state.user.name+"&pw="+this.state.user.pw)
            .then(()=>{this.submitLogin()})
            .catch((err)=>{
                if(err.toString().indexOf("400")>-1){
                    this.setState({
                        error_user:"Account does not exist"
                    })
                    console.log("Account does not exist")
                }
                if(err.toString().indexOf("403")>-1){
                    this.setState({
                        error_pw:"Password is incorrect"
                    })
                    console.log("Password is incorrect")
                }

            })
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
                        <Paper style={{color:"white",marginTop:50,backgroundColor:"#263238"}} className="Login" zDepth={2} rounded={false} >
                            <div><img className="login-logo" width={300} src={logo}></img></div>
                            <h3>Crab.io</h3>
                            <div style={{marginTop:20}}>
                                <Divider></Divider>
                                <TextField inputStyle={{color:"#FFF"}} style={{color:"#FFF"}} underlineFocusStyle={{borderColor:"#80D8FF"}} floatingLabelStyle={{color:"white"}} hintStyle={{color:"white"}} errorText={this.state.error_user} onChange={(e)=>this.handleChange(e,"name")} floatingLabelText="Username" className="formo_login"></TextField>
                                <TextField inputStyle={{color:"#FFF"}}underlineFocusStyle={{borderColor:"#80D8FF"}} floatingLabelStyle={{color:"white"}} hintStyle={{color:"white"}} errorText={this.state.error_pw} onChange={(e)=>this.handleChange(e,"pw")}  floatingLabelText="Password"  type="password" className="formo_login"></TextField>
                            </div>
                            <FlatButton label="Sign in" labelStyle={{color:"#263238"}} onClick={()=>this.validateLogin()} style={{marginTop:30,color:"#263238"}} backgroundColor="#80D8FF" className="login-btn"></FlatButton>
                        </Paper>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
