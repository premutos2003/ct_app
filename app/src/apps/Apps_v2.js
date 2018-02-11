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
import AppsDialog from './AppsDialog';
import DataTables from 'material-ui-datatables';
import Paper from "material-ui/Paper"

import Divider from "material-ui/Divider"
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const platforms = [
    'AWS',
    'Microsoft Azure',
    'Google Cloud',
    'Heroku',
    'Digital Ocean',
];


class Apps extends Component {
    constructor(props){
        super(props)
        this.state={
            open:false,
            runtime:1,
            platform:1,
            value:1,
            values:[],
            snackbar_open:false,
            snackbar_message:"Deploy Job Initiated for",
            app_name:"",
            items:[],
            dialog:<div></div>,
            table_rows:[],
            selected:-1
        }
        this.onAppSelect = this.onAppSelect.bind(this)
    }


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    addItemToTable = (object) => {
        let items = this.state.items
        items.push(object)
        this.setState({
            items:items,
            open:false,
        })
    }
    terminateApp = () =>{
        console.log(this.state.selected,"SELCT")
        if(this.state.selected>-1){
            let items = this.state.items.splice(this.state.selected,this.state.selected)
            this.setState({items:items})
        }

    }
    onAppSelect = (rows) => {
        console.log(rows)
        this.setState( {selected:rows[0]},()=>{console.log("Selected:",this.state.selected)});
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
                padding: 10,
            },
        };
        const actions = [
            <FlatButton
                labelStyle={{color:"black"}}
                rippleColor="#03A9F4"
                backgroundColor="#C5CAE9"
                label="Cancel"
                primary={true}
                onClick={()=>this.handleClose}
            />,
            <FlatButton
                labelStyle={{color:"black"}}
                rippleColor="#03A9F4"
                backgroundColor="#C5CAE9"
                label="Deploy App"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        const {values} = this.state;
        return (
            <div  className="Apps">
                <div className="container">
                    <AppsDialog close={this.handleClose} open={this.state.open} rowFunc={()=>this.onAppSelect} addItems={this.addItemToTable}></AppsDialog>
                    <div>
                        <Table  deselectOnClickaway={false} onRowSelection={this.onAppSelect}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>App_ID</TableHeaderColumn>
                                    <TableHeaderColumn>Stack</TableHeaderColumn>
                                    <TableHeaderColumn>PCP</TableHeaderColumn>
                                    <TableHeaderColumn>ENV.</TableHeaderColumn>
                                    <TableHeaderColumn>Created</TableHeaderColumn>
                                    <TableHeaderColumn>Last</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.items}
                            </TableBody>
                        </Table>
                    </div>
                    <FlatButton style={{margin:10}} labelStyle={{fontSize:20}} className="func-btn" backgroundColor="#C5CAE9" rippleColor="black" onClick={this.handleOpen}>Deploy App</FlatButton>
                    <FlatButton style={{margin:10}} labelStyle={{fontSize:20}} className="func-btn" backgroundColor="#ffcdd2" rippleColor="black" onClick={this.terminateApp}>Terminate App</FlatButton>
                    <Paper zDepth={1} style={{margin:20,height:250}}></Paper>
                </div>
                <Snackbar
                    autoHideDuration={2000}
                    open={this.state.snackbar_open}
                    message="App Deployment initialized"
                    bodyStyle={{textAlign:"center",backgroundColor:"#FFB300",color:"black"}}>

                </Snackbar>
            </div>

        );
    }
}

export default Apps;
