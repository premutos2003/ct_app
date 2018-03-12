/**
 * Created by alessandrofurkim on 21.11.17.
 */
import React, { Component } from 'react';
import '../App.css';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import AppBar from 'material-ui/AppBar';
import logo from '../logo.svg';
import '../App.css';
import Paper from 'material-ui/Paper/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Monitor from 'material-ui/svg-icons/hardware/desktop-windows/';
import Settings_Icon from 'material-ui/svg-icons/action/build/';
import Moni from 'material-ui/svg-icons/hardware/toys/';
import Pipe from 'material-ui/svg-icons/hardware/videogame-asset/';
import Help from 'material-ui/svg-icons/action/help/';
import Add from 'material-ui/svg-icons/av/playlist-add/';
import Dashboard from '../icons/dashboard.svg';
import Cloud_Icon from 'material-ui/svg-icons/file/cloud/';
import Metrics from '../metrics/Metrics';
import Settings from '../settings/Settings';
import Apps from '../apps/Apps';
import Pipeline from '../pipelines/Pipelines';
import Cloud from '../cloud/Cloud';
import FadeProps from 'fade-props';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Cube from "./cube.jpg"
import HomePage from "./HomePage"
import Avatar from "material-ui/Avatar"
import SvgIcon from 'material-ui/SvgIcon';
import UserIcon from 'material-ui/svg-icons/action/face';

let crab = require("../icons/crab.svg")



class Home extends Component {

    constructor(props){
        super(props)
        this._child="",
        this.state={
            user : this.props.user,
            page: <HomePage/>,
            page_str:"",
            open:{apps:false,settings:false,cloud:false,metrics:false,pipe:false},
            app_type:""
        }

        this.changePage = this.changePage.bind(this)
    }
    componentWillMount=()=>{
    }
    changePage = (page) =>{
        let pageElem = <div></div>
        let open = this.state.open
        Object.keys(open).forEach((key)=>{
            open[key] =false
        })
        let page_string=""
        switch (page){
            case "Settings":
                pageElem = <Settings/>
                page_string="Settings"
                break;
            case "Apps":
                pageElem =<Apps ref={(child) => { this._child = child; }} app_type={this.state.app_type}/>
                page_string="Apps"
                open["apps"] = true
                break;
            case "Metrics":
                pageElem= <Metrics/>
                page_string="Metrics"
                break;
            case "Cloud":
                pageElem= <Cloud/>
                page_string="Cloud"
                break;
            case "Pipe":
                pageElem= <Pipeline/>
                page_string="Pipe"
                break;
            case "Home":
                pageElem= <HomePage/>
                page_string="Home"
                break;
        }
        this.setState({
            page:pageElem,
            page_str:page_string,
            open:open
        })
    }

    handleAppType=(type)=>{
        this.setState({app_type:type})
        this._child.handleOpen(type)
    }
    handleClick(item){
        switch (item){
            case "Home":
                break;
        }
    }

    render() {
        let app_types=[
            <ListItem  leftAvatar={<Avatar backgroundColor="#B2DFDB">N</Avatar>} style={{height:70}} className="nav-icn" onClick={()=>{this.handleAppType("node")}} hoverColor="#E0F2F1" secondaryText="Node.js" primaryText="Express"></ListItem>,
            <ListItem  leftAvatar={<Avatar backgroundColor="#B3E5FC">R</Avatar>} className="nav-icn" onClick={()=>{this.handleAppType("react")}} hoverColor="#E1F5FE" secondaryText="Node.js" primaryText="React"></ListItem>,
        ]
        let styles = {
            home: {backgroundColor: ""},
            apps: {backgroundColor: ""},
            cloud: {backgroundColor: ""},
            settings: {backgroundColor: ""},
            help: {backgroundColor: ""}
        }
        return (
                <div className="container-fluid app-view">
            <div className="row ">
                <div className="col-md-3"><Drawer open={true}><header className="App-drawer"><List><ListItem style={{color:"white",fontSize:18}} leftAvatar={<Paper style={{width:50,height:50,textAlign:"center"}} circle={true} ><img width={40} size={40} src={crab}></img></Paper>}>{this.state.user}</ListItem></List>
                </header>
                <List>
                    <ListItem className="nav-icn" onClick={()=>this.changePage("Home")}  leftIcon={<Moni/>}>Home</ListItem>
                    <ListItem className="nav-icn"rightIcon={<IconButton iconClassName="muidocs-icon-action-home"></IconButton>} open={this.state.open["apps"]} nestedItems={app_types}  onClick={()=>this.changePage("Apps")} leftIcon={<Monitor/>}>My Apps</ListItem>
                    <ListItem className="nav-icn"onClick={()=>this.changePage("Cloud")}rightIcon={<IconButton><FontIcon className="muidocs-icon-action-home" /></IconButton>}   leftIcon={<Cloud_Icon/>}>My Cloud</ListItem>
                    <ListItem className="nav-icn"onClick={()=>this.changePage("Pipe")} leftIcon={<Pipe/>} >Pipelines</ListItem>
                    <ListItem className="nav-icn"leftIcon={<Settings_Icon/>} >Settings</ListItem>
                    <ListItem className="nav-icn"leftIcon={<Help/>} >Help</ListItem>
                </List>
                </Drawer></div>
                <div className="col-md-7">
                    <FadeProps>
                        {this.state.page}
                    </FadeProps>
                </div>

            </div>
            </div>

        );
    }
}

export default Home;
