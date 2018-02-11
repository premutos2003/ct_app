/**
 * Created by alessandrofurkim on 21.11.17.
 */
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Paper from "material-ui/Paper"
import AppBar from 'material-ui/AppBar';
import Rocket from '../icons/startup.svg';

class App extends Component {
    render() {
        return (
            <div className="Home">

                <div className="container-fluid">
                    <h3 style={{margin:20}}><img style={{marginRight:20}} height={50} width={50} src={Rocket}></img>Settings</h3>

                </div>
            </div>
        );
    }
}

export default App;
