import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home/Home';
import Login from './login/Login';
import Setup from './login/Setup';
import FadeProps from 'fade-props';
import axios from "axios"

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'


import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
    constructor(props){
        super(props)
        this.state ={
            page : <Setup onLogin={()=>this.handleLogin()}></Setup>
        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(){
        console.log("handle Login")
        let prom =new Promise((res,rej)=>{
            this.setState({
                page:<div className="setup"><CircularProgress size={150} thickness={9} /><h3>Starting worker-server</h3></div>
            })
            axios.get("http://localhost:3000/init-worker").then((response)=>{
                res(console.log(response))
            }).catch((err)=>{console.log(err)})

        })
        prom.then(()=>{
            this.setState({
                page:<Home></Home>
            })
        })
    }
  render() {


    return (

      <div className="App">
          <div className="Home">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
              </header>
          </div>
          <FadeProps>
          {this.state.page}
          </FadeProps>
      </div>
    );
  }
}

export default App;
