/**
 * Created by alessandrofurkim on 21.11.17.
 */
import React, { Component } from 'react';
import '../App.css';
import FlatButton from "material-ui/FlatButton"
import Dialog from 'material-ui/Dialog';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Avatar from "material-ui/Avatar"
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppsStepper from "./AppsStepper"

injectTapEventPlugin();

const platforms = [
    'AWS'
];
const env =["production","staging","developement"]

class DialogApps extends Component {
    constructor(props){
        let date =new Date()
        super(props)
        this.env = props.env
        this.close = props.close
        this.colors={
            node:"#E0F2F1",
            react:"#E1F5FE"
        }
            this.state={
            open:props.open,
            runtime:1,
            platform:1,
            value:"Python 2.7",
            values:[],
                env:"",
                git:"",
            snackbar_open:false,
            snackbar_message:"Deploy Job Initiated for",
            app_name:"",
            deploy_object:{
                app_id:"",
                stack:"",
                provider:[],
                git:"",
                env:"",
                created:date.toLocaleDateString()+"-"+date.toLocaleTimeString(),
                last:date.toLocaleDateString()+"-"+date.toLocaleTimeString(),
                type:""
            },
            instance_type:"Micro"
        }
        this.handleClose = this.handleClose.bind(this)
    }
    handleChangeRuntime = (event, index, value) => {
        var curr_state = this.state.deploy_object
        curr_state["runtime"] = value
        this.setState({runtime:value,deploy_object:curr_state});

    }
    handleChangePlatform = (event, index, values) => {
        console.log(values)
        var curr_state = this.state.deploy_object
        curr_state["provider"] = values
        this.setState({values:values,deploy_object:curr_state});
    }


    handleOpen = () => {
        this.setState({open: true});
    };

    handleCancel=()=>{
        this.setState({open:false})
    }

    handleClose = (app) => {
        console.log("hello",app)
        let envi = this.env()
        console.log(envi,"BRUAPPPPPP")
        app["provider"].forEach((provider)=>{
                let item = {
                    app_id:app["app_id"],
                    stack:app["stack"],
                    provider:provider,
                    git:app["git"],
                    env:envi,
                    created:app["created"],
                    last:app["last"],
                    type:app["type"]
                 }
                this.props.addItems(item)
            })
        this.setState({open:false})
    };


    resetObjectState =()=>{
        let date = new Date()
        this.setState({deploy_object:{
            app_id:"",
            stack:"",
            provider:[],
            runtime:"",
            env:"",
            git:"",
            created:date.toLocaleDateString()+"-"+date.toLocaleTimeString(),
            last:date.toLocaleDateString()+"-"+date.toLocaleTimeString(),
            type:""
        },values:[],env:""})
    }

    handleChangeInstance = (event, index, value) => {
        var curr_state = this.state.deploy_object
        curr_state["instance"] = value
        this.setState({instance_type:value,deploy_object:curr_state});
    }
    handleChangeEnv = (event, index, value) => {
        var curr_state = this.state.deploy_object
        curr_state["env"] = value
        this.setState({env:value,deploy_object:curr_state});
    }

    menuItems(values) {
    return platforms.map((name) => (
        <MenuItem
            key={name}
            insetChildren={true}
            checked={values && values.indexOf(name) > -1}
            value={name}
            primaryText={name}
        />
    ));
}
    menuItemsEnv(values) {
        return env.map((name) => (
            <MenuItem
                key={name}
                insetChildren={true}
                checked={values && values.indexOf(name) > -1}
                value={name}
                primaryText={name}
            />
        ));
    }
    changeValue = (e,type) => {
        console.log(e.target.value)
        const value = e.target.value;
        var curr_state = this.state.deploy_object
        curr_state[type] = value;
        this.setState({deploy_object:curr_state});
    }

    render() {
        let badge = <div></div>
        if(this.props.type=="node"){badge=<Avatar size={110} style={{float:"left"}} backgroundColor="#B2DFDB">N</Avatar>}
        if(this.props.type=="react"){badge=<Avatar size={110} style={{float:"left"}} backgroundColor="#B3E5FC">R</Avatar>}

        const styles = {
            mediumIcon: {
                width: 48,
                height: 48,
            },
            largeIcon: {
                width: 60,
                height: 60,
            },
            medium: {
                width: 96,
                height: 96,
                padding: 24,
            },
            large: {
                width: 120,
                height: 120,
                padding: 30,
            },
        };

        const {values} = this.state;
        return (
            <div className="DialogApps">
                <Dialog
                    modal={false}
                    open={this.props.open}
                    bodyStyle={{padding:0}}
                    onRequestClose={this.close}
                >
                    <div style={{backgroundColor:this.colors[this.props.type]}} className="dialog-header" >{badge}</div>
                    <br/>
                    <AppsStepper close={this.close} onFinish={this.handleClose} type={this.props.type}/>

                </Dialog>
            </div>

        );
    }
}

export default DialogApps;
