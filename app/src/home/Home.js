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


class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            page:<div></div>,
            page_str:""
        }
        this.changePage = this.changePage.bind(this)
    }
    changePage = (page) =>{
        let pageElem = <div></div>
        let page_string=""
        switch (page){
            case "Settings":
                pageElem = <Settings/>
                page_string="Settings"
                break;
            case "Apps":
                pageElem =<Apps/>
                page_string="Apps"
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

        }
        this.setState({
            page:pageElem,
            page_str:page_string
        })
    }
    handleClick(item){
        switch (item){
            case "Home":
                break;
        }
    }

    render() {

        let styles = {
            home: {backgroundColor: ""},
            apps: {backgroundColor: ""},
            cloud: {backgroundColor: ""},
            settings: {backgroundColor: ""},
            help: {backgroundColor: ""}
        }
        return (
                <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><Drawer open={true}><header className="App-header">
                </header>
                <List>
                    <ListItem  onClick={()=>this.handleClick()} leftIcon={<Moni/>}>Home</ListItem>
                    <ListItem rightIcon={<IconButton><FontIcon className="muidocs-icon-action-home" /></IconButton>}  nestedItems={<ListItem >AWS</ListItem>} onClick={()=>this.changePage("Apps")} leftIcon={<Monitor/>}>My Apps</ListItem>
                    <ListItem rightIcon={<IconButton><FontIcon className="muidocs-icon-action-home" /></IconButton>}  nestedItems={<ListItem >AWS</ListItem>} leftIcon={<Cloud_Icon/>}>My Cloud</ListItem>
                    <ListItem leftIcon={<Pipe/>} >Pipelines</ListItem>
                    <ListItem leftIcon={<Settings_Icon/>} >Settings</ListItem>
                    <ListItem leftIcon={<Help/>} >Help</ListItem>
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
