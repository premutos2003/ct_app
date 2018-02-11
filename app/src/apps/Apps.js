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
import List from "material-ui/List"
import ListItem from "material-ui/List/ListItem"
import aws_logo from '../icons/aws-logo.svg';
import SvgIcon from 'material-ui/SvgIcon';
import Cloud_Icon from 'material-ui/svg-icons/file/cloud/';
import logo from '../logo.svg';

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
        this.colors={
            aws:{backgroundColor:"#FFE082"},
            ms:{backgroundColor:"#BBDEFB"},
            gcp:{backgroundColor:"#FFCCBC"},
            hku:{backgroundColor:"#E1BEE7"},
            do:{backgroundColor:"#C5CAE9"}
        }
        this.state={

        }

        this.onAppSelect = this.onAppSelect.bind(this)
    }



    render() {


        return (
            <div>

        </div>
        );
    }
}

export default Apps;
