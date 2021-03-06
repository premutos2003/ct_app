import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Cube from "../home/cube.jpg"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from "material-ui/Divider"
import AppsDialog from './AppsDialog';
import AppComponent from './AppComponent';
import Subheader from "material-ui/Subheader"
import Paper from "material-ui/Paper"
import Spa from "material-ui/svg-icons/places/spa"
import Avatar from "material-ui/Avatar"
import Snackbar from 'material-ui/Snackbar';
import axios from "axios"
import CircularProgress from 'material-ui/CircularProgress';
import EnvTabs from "./EnvTabs"
class Apps extends Component {
    constructor(props){
        super(props)
       this.app_type = props.app_type
        this.state={
            modal_open:false,
            items:{
                development:{node:[],
                    react:[]},
                staging:{node:[],
                    react:[]},
                production:{node:[],
                    react:[]},
            },
            snack_open:false,
            app_type:"",
            active:"development",
            status:{
                react:<div></div>,
                node:<div></div>
            }
        }
    }
    componentWillMount=()=>{
        axios.get("http://localhost:3000/getAllApps").then((response)=>{
            let items = this.state.items
            if(response.data.length>0){
                response.data.map((app)=>{
                    items[app["env"]][app["type"]].push(<AppComponent app={app}></AppComponent>)
                })
                this.setState({items:items})
            }
        })
    }
    handleOpen = (type) => {
        this.setState({modal_open: true,app_type:type});
    };

    handleClose = () => {
        this.setState({modal_open: false});
    };
    getActive=()=>{
        console.log(this.state.active,"TESTO1")
        return this.state.active
    }
    addItemToTable = (object) => {
        let items = this.state.items
        console.log(items)
        console.log(object)
        console.log("FUCKKKKSADSADSSAD11111")
        console.log(items[object["env"]])
        //axios.get("http://localhost:3000/buildJob?git="+object["git"]+"&stack="+object["stack"]+"&app_id="+object["app_id"])
            axios.post("http://localhost:3000/insert_app",object)
            .then(()=>{
                items[object["env"]][object["type"]].push(<AppComponent app={object}></AppComponent>)
                    let status = this.state.status
                    status[object["type"]] = <CircularProgress style={{float:"right"}}></CircularProgress>
                    this.setState({
                        items:items,
                        modal_open:false,
                        snack_open:true,
                        status:status
                    })
                new Promise((res,rej)=>{
                    setTimeout(res,20000)
                }).then(()=>{
                    this.setState({
                       status:{node:<div></div>,react:<div></div>}
                    })
                })
            }).catch((err)=>{console.log(err)})

    }
    handleRequestClose = () => {
        this.setState({
            snack_open: false,
        });
    };
    handleChangeTab=(tab)=>{
        console.log(tab)
        this.setState({active:tab})
    }
    render() {
        return (
            <div className="container-fluid app-view">
                <div className="row">
               <h3>Apps </h3>
                    <Divider></Divider>
                    <EnvTabs active={this.handleChangeTab} dev={this.state.items["development"]} stag={this.state.items["staging"]} prod={this.state.items["production"]}></EnvTabs>
                    <AppsDialog env={this.getActive} type={this.state.app_type} addItems={this.addItemToTable} open={this.state.modal_open}  close={this.handleClose}/>
            </div>

                <Snackbar
                    style={{textAlign:"center"}}
                    open={this.state.snack_open}
                    message="Started deployment pipeline"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default Apps;
