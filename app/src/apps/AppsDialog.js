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
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Divider from "material-ui/Divider"


const platforms = [
    'AWS',
    'Microsoft Azure',
    'Google Cloud',
    'Heroku',
    'Digital Ocean',
];


class DialogApps extends Component {
    constructor(props){
        let date =new Date()
        super(props)
        this.close = props.close
            this.state={
            open:props.open,
            runtime:1,
            platform:1,
            value:"Python 2.7",
            values:[],
            snackbar_open:false,
            snackbar_message:"Deploy Job Initiated for",
            app_name:"",
            deploy_object:{
                app_id:"",
                stack:"",
                provider:[],
                runtime:"",
                created:date.toLocaleDateString()+"-"+date.toLocaleTimeString(),
                last:date.toLocaleDateString()+"-"+date.toLocaleTimeString()
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
        let date = new Date()
        if(flag=="deploy"){
            this.state.deploy_object["provider"].forEach((provider)=>{
                let item = {
                    app_id:this.state.deploy_object["app_id"],
                    stack:this.state.deploy_object["stack"],
                    provider:provider,
                    runtime:this.state.deploy_object["runtime"],
                    created:this.state.deploy_object["created"],
                    last:this.state.deploy_object["last"]
                 }
                this.props.addItems(item)
            })
            this.setState({deploy_object:{
                app_id:"",
                stack:"",
                provider:[],
                runtime:"",
                created:date.toLocaleDateString()+"-"+date.toLocaleTimeString(),
                last:date.toLocaleDateString()+"-"+date.toLocaleTimeString()
            }})
        }
        else{
            this.close()
        }

    };


    handleChangeInstance = (event, index, value) => {
        var curr_state = this.state.deploy_object
        curr_state["instance"] = value
        this.setState({instance_type:value,deploy_object:curr_state});

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
    changeValue = (e, type) => {
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
                <Dialog style={{padding:30}}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                >
                    <div>
                        <div><img height={40} width={40} src={Rocket}></img><span><h3 style={{marginLeft:10,display:"inline"}}>Deploy a new Application to the Cloud</h3></span></div>
                        <br/>
                        <Divider></Divider>
                        <div>
                            <TextField style={{width:300}} onChange={e => this.changeValue(e, 'app_id')} floatingLabelText="Application Name" className="formo"></TextField>
                        </div>
                        <div><TextField style={{width:300}} onChange={e => this.changeValue(e, 'stack')} floatingLabelText="Stack name" className="formo"></TextField></div>
                        <div><TextField style={{width:300}} floatingLabelText="Git SSH url" className="formo"></TextField></div>
                        <div style={{marginTop:30}}>
                            <SelectField multiple={true} className="formo" floatingLabelText="Public Cloud Provider" style={{width:300}}  value={values} onChange={this.handleChangePlatform}>
                                {this.menuItems(values)}
                            </SelectField>

                        </div>
                        <div style={{marginTop:30}}>
                            <SelectField className="formo" floatingLabelText="Envirnoment Runtime" style={{width:300}}  value={this.state.runtime} onChange={this.handleChangeRuntime}>
                                <MenuItem value="Python 2.7" primaryText="Python 2.7" />
                                <MenuItem value="Python 3.7" primaryText="Python 3.7" />
                                <MenuItem value="Node.js 6.0" primaryText="Node.js 6.0" />
                                <MenuItem value="Java 8"  primaryText="Java 8" />
                                <MenuItem value=".NET Core (C#)"  primaryText=".NET Core (C#)" />
                            </SelectField>
                            <SelectField  className="formo" floatingLabelText="Instance type" style={{width:300}}  value={this.state.instance_type} onChange={this.handleChangeInstance}>
                                <MenuItem value="Micro" primaryText="Micro" />
                                <MenuItem value="Mini" primaryText="Mini" />
                                <MenuItem value="Medium" primaryText="Medium" />
                                <MenuItem value="Large"  primaryText="Large" />
                            </SelectField></div>
                        <CardText>
                        </CardText>
                    </div>
                </Dialog>
            </div>

        );
    }
}

export default DialogApps;
