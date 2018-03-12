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
import Divider from 'material-ui/Divider';
class HomePage extends Component {
    render() {
        return (
            <div className="container-fluid app-view">
                <div className="row">
                    <h3>Dashboard</h3>
                    <Divider></Divider>
                    <div className="col-md-3">

                </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
