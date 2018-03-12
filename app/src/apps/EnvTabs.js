import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import {Tabs, Tab} from 'material-ui/Tabs';

class EnvTabs extends Component {
    constructor(props){

        super(props)
        console.log(this.props.dev)
        console.log(this.props.prod)
        console.log(this.props.stag)
        this.state={
            modal_open:false,
            items:{node:[],react:[]},
            snack_open:false,
            app_type:"",
            dev:{
                node:this.props.dev.node,
                react:this.props.dev.react
            },
            stag:{
                node:this.props.stag.node,
                react:this.props.stag.react
            },
            prod:{
                node:this.props.prod.node,
                react:this.props.prod.react
            },
            status:{
                react:<div></div>,
                node:<div></div>
            },
            style:{
                dev:{
                    color:"#000",
                    backgroundColor:"",

                },stag:{
                    color:"#000",
                    backgroundColor:"",

                },prod:{
                    color:"#000",
                    backgroundColor:"",
                }
            }
        }
    }

    handleActive=(tab)=>{
        console.log("FIRST")
        this.props.active(tab)
    }

    render() {

        return (
            <div>
                <Tabs inkBarStyle={{backgroundColor:"#80D8FF",height:3}} tabItemContainerStyle={{backgroundColor:"white"}}>
                    <Tab onActive={()=>this.handleActive("development")} style={this.state.style.dev} label="Development" >
                        <div>
                            <div className="row">{this.state.dev["node"]}</div>
                            <div className="row">{this.state.dev["react"]}</div>
                        </div>
                    </Tab>
                    <Tab onActive={()=>this.handleActive("staging")} style={this.state.style.stag} label="Staging" >
                        <div>
                            <div className="row">{this.state.stag["node"]}</div>
                            <div className="row">{this.state.stag["react"]}</div>
                        </div>
                    </Tab>
                    <Tab onActive={()=>this.handleActive("production")} style={this.state.style.prod}
                              label="Production"
                        data-route="/home"
                    >
                        <div>
                            <div className="row">{this.state.prod["node"]}</div>
                            <div className="row">{this.state.prod["react"]}</div>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}

export default EnvTabs;
