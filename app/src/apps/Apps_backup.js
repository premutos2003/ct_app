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
        this.state={
            modal_open:false,
            items:{node:[],react:[]},
            snack_open:false,
            app_type:"",
            status:{
                react:<div></div>,
                node:<div></div>
            }
        }
    }

    handleOpen = (type) => {
        this.setState({modal_open: true,app_type:type});
    };

    handleClose = () => {
        this.setState({modal_open: false});
    };

    addItemToTable = (object) => {
        let items = this.state.items
        //axios.get("http://localhost:3000/buildJob?git="+object["git"]+"&stack="+object["stack"]+"&app_id="+object["app_id"])
            axios.get("http://localhost:3000/status")
            .then(()=>{
                items[object["type"]].push(<ListItem secondaryText={object.stack} leftAvatar={<Avatar icon={<Spa/>}/>}>{object.app_id}</ListItem>)
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
    render() {
        return (
            <div className="container-fluid app-view">
                <div className="row">
               <h3>Apps</h3>
                    <EnvTabs></EnvTabs>
                    <Divider></Divider>
                    <div className="col-md-5">
                        <Card className="app_obj" >
                            <CardHeader style={{backgroundColor:"#E8F5E9"}} subtitle="Deploy app" title="Node.js">{this.state.status.node}</CardHeader><Divider></Divider><List><ListItem disabled={true}  rightIconButton={<FloatingActionButton mini={true} backgroundColor="#80D8FF"  onClick={()=>this.handleOpen("node")} className="add-btn"><ContentAdd></ContentAdd></FloatingActionButton>} nestedItems={this.state.items["node"]} open={true} primaryText="AWS"/></List>
                        <AppsDialog type="node" addItems={this.addItemToTable} open={this.state.modal_open}  close={this.handleClose}/></Card>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-5">
                        <Card className="app_obj" >
                            <CardHeader style={{backgroundColor:"#E1F5FE"}} subtitle="Deploy app" title="React.js"></CardHeader><Divider></Divider><List><ListItem disabled={true} rightIconButton={<FloatingActionButton mini={true}  backgroundColor="#80D8FF"  onClick={()=>this.handleOpen("react")} className="add-btn"><ContentAdd></ContentAdd></FloatingActionButton>} open={true} primaryText="AWS" nestedItems={this.state.items["react"]}/></List>
                            <AppsDialog type={this.state.app_type} addItems={this.addItemToTable} open={this.state.modal_open}  close={this.handleClose}/></Card>
                    </div>
                </div>
                <div style={{marginTop:30}}>
                </div>
                <Snackbar
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
