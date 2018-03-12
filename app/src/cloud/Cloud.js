/**
 * Created by alessandrofurkim on 21.11.17.
 */
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
class Cloud extends Component {
    render() {
        return (
            <div className="container-fluid app-view">
                <div className="row">
                    <h3>Public cloud providers</h3>
                    <Divider></Divider>
                    <div className="col-md-3">

                    </div>
                </div>
            </div>
        );
    }
}

export default Cloud;
