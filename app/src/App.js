import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home/Home';
import Login from './login/Login';
import Setup from './login/Setup';
import FadeProps from 'fade-props';
import axios from "axios"
import Apps from "./apps/Apps"
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'


import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
    constructor(props){
        super(props)
        this.state ={
            page : <div></div>,
            status:<h4>Building nodes</h4>
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentWillMount= () =>{
        console.log("Component mounted")
        axios.get("http://localhost:3000/status").then((response)=>{
            if(response.data["status"]=="ready"){
                this.setState({page:<Login onLogin={this.handleLogin}/>})
            }
            else{this.setState({page:<Setup onRegister={this.handleRegister}/>})}
        })
    }


    handleLogin=(user)=>{
        console.log(user)
        let prom_init =new Promise((res,rej)=>{
            this.setState({
                page:<div className="setup"><CircularProgress size={150} thickness={9} />{this.state.status}</div>
            })
            axios.get("http://localhost:3000/init-worker").then((response)=>{
                res(console.log(response))
                this.setState({
                    status:<h4>Starting workers</h4>
                })
            }).catch((err)=>{
                if(err.toString().indexOf("400")>-1){
                    console.log(err)
                    this.setState({
                        page:<Home user={user.name}></Home>
                    })
                }
            })

            setTimeout(res,10000)
        }).then(()=>{
            this.setState({
                page:<Home user={user.name}></Home>
            })
        })

    }

    handleRegister=(user)=>{
        console.log("handle Register",user)
        let prom_regi =new Promise((res,rej)=>{
            res(axios.post("http://localhost:3000/insert_user",
                {
                    name:user.name,
                    password:user.password,
                    role:"admin",
                    AWS:user.AWS,
                    GCP:user.GCP

                }))
        })
        prom_regi.then(()=>{
            let prom_init =new Promise((res,rej)=>{
                this.setState({
                    page:<div className="setup"><CircularProgress innerStyle={{color:"#80D8FF",backgroundColor:"#80D8FF"}} color="#80D8FF" size={150} thickness={9} />{this.state.status}</div>
                })
                axios.get("http://localhost:3000/init-worker").then((response)=>{
                    res(console.log(response))
                    this.setState({
                        status:<h4>Starting workers</h4>
                    })
                }).catch((err)=>{console.log(err)})

                setTimeout(res,10000)
            }).then(()=>{

            })
            prom_init.then(()=>{
                this.setState({
                    page:<Home user={user.name}></Home>
                })
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
