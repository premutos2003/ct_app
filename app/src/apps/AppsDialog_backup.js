/**
 * Created by alessandrofurkim on 21.11.17.
 */
import React, { Component } from 'react';
import Rocket from '../icons/startup.svg';
import '../App.css';
import FlatButton from "material-ui/FlatButton"
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import AddIcon from "material-ui/svg-icons/content/add-circle"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';
import Subheader from "material-ui/Subheader"

import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Divider from "material-ui/Divider"


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

    handleClose = (flag) => {
        console.log("hello")
        let envi = this.env()
        console.log(envi,"BRUAPPPPPP")

        if(flag=="deploy"){
            this.state.deploy_object["provider"].forEach((provider)=>{
                let item = {
                    app_id:this.state.deploy_object["app_id"],
                    stack:this.state.deploy_object["stack"],
                    provider:provider,
                    git:this.state.deploy_object["git"],
                    runtime:this.state.deploy_object["runtime"],
                    env:envi,
                    created:this.state.deploy_object["created"],
                    last:this.state.deploy_object["last"],
                    type:this.props.type
                 }
                this.props.addItems(item)
            })
            this.resetObjectState()
        }
        else{
            this.close()
        }

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
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={()=>this.handleClose()}
            />,
            <FlatButton
                label="Deploy App"
                primary={true}
                onClick={()=>this.handleClose("deploy")}
            />,
        ];
        const {values} = this.state;
        return (
            <div className="DialogApps">
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    bodyStyle={{padding:0}}
                >
                    <div style={{backgroundColor:this.colors[this.props.type]}} className="dialog-header" >Deploy app to cloud</div>
                    <div className="dialog-body">

                        <div style={{width:300}}><TextField onChange={(e)=>this.changeValue(e,"app_id")} className="modal-field"  floatingLabelText="App name"></TextField></div>
                        <div style={{width:300}}><TextField onChange={(e)=>this.changeValue(e,"stack")}   className="modal-field" floatingLabelText="Stack name"></TextField></div>
                        <div style={{width:500}}><TextField onChange={(e)=>this.changeValue(e,"git")}   fullWidth={true} className="modal-field" floatingLabelText="Git https url"></TextField></div>
                        <br></br>
                        <SelectField  className="modal-field" onChange={this.handleChangePlatform} multiple={true} floatingLabelText="Public Cloud Provider" value={this.state.values}>
                            {this.menuItems(this.state.values)}
                        </SelectField>
                    </div>

                </Dialog>
            </div>

        );
    }
}

export default DialogApps;
