/**
 * Created by alessandrofurkim on 07.03.18.
 */
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import ListItem from 'material-ui/List/ListItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class AppComponent extends Component {
    constructor(props){
        super(props)
        this.colors={
            node:["#E0F2F1","#B2DFDB"],
            react:["#E1F5FE","#B3E5FC"]
        }
        this.icons={
            node:"N",
            react:"R"
        }
    }

    render() {
        console.log(this.props.app.provider)
        //let providers = this.props.app.providers.map((provider)=>{return <h5>Providers:{provider}</h5>})
        return (
            <div className="col-md-4">
                <Card  expandable={true} className="app_obj"><ListItem className="app-comp-header" hoverColor={this.colors[this.props.app.type][0]}><CardHeader  className="app-comp-header" avatar={<Avatar backgroundColor={this.colors[this.props.app.type][1]}>{this.icons[this.props.app.type]}</Avatar>} title={this.props.app.app_id} subtitle={this.props.app.stack} style={{padding:0,backgroundColor:this.colors[this.props.app.type]}}></CardHeader></ListItem><Divider/>
                </Card>
            </div>
        );
    }
}

export default AppComponent;
