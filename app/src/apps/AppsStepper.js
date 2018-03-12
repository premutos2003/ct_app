/**
 * Created by alessandrofurkim on 09.03.18.
 */
import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

/**
 * A contrived example using a transition between steps
 */
const platforms = [
    'AWS'
];
class AppsStepper extends React.Component {
    colors={
    node:["#E0F2F1","#B2DFDB"],
    react:["#E1F5FE","#B3E5FC"]
}
    finish =this.props.onFinish
    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
        runtime:1,
        platform:1,
        value:"Python 2.7",
        values:[],
        env:"",
        git:"",
        snackbar_open:false,
        snackbar_message:"Deploy Job Initiated for",
        app_id:"",
        deploy_object:{
            app_id:"",
            stack:"",
            provider:[],
            git:"",
            env:"",
            created:new Date().toLocaleDateString()+"-"+new Date().toLocaleTimeString(),
            last:new Date().toLocaleDateString()+"-"+new Date().toLocaleTimeString(),
            type:this.props.type
        },
        errorText_stack:"",
        errorText_name:"",
        instance_type:"Micro",
        errorText_git:"",
        error_provider:"",
        finished:false
    };
    changeValue = (e,type) => {
        console.log(e.target.value)
        const value = e.target.value;
        var curr_state = this.state.deploy_object
        curr_state[type] = value;
        this.setState({deploy_object:curr_state});
    }
    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };
    handleChangePlatform = (event, index, values) => {
        console.log(values)
        var curr_state = this.state.deploy_object
        curr_state["provider"] = values
        this.setState({values:values,deploy_object:curr_state});
    }


    onEnd=()=>{
            this.finish(this.state.deploy_object)
            this.setState({deploy_object:{
                app_id:"",
                stack:"",
                provider:[],
                git:"",
                env:"",
                created:new Date().toLocaleDateString()+"-"+new Date().toLocaleTimeString(),
                last:new Date().toLocaleDateString()+"-"+new Date().toLocaleTimeString(),
                type:""
            },finished:false})


    }

    handleNext = () => {
        const {stepIndex} = this.state;
        switch(stepIndex){
            case 0:
                if(this.state.deploy_object.app_id==""){
                    this.setState({
                        errorText_name:"You must specify a valid app name",
                        finished: stepIndex >= 3,
                    });
                    break;
                }
                if(this.state.deploy_object.stack==""){
                    this.setState({
                        errorText_stack:"You must specify a valid stack name",
                        finished: stepIndex >= 3,
                    });
                    break;
                }

                if (!this.state.loading) {
                    this.dummyAsync(() => this.setState({
                        loading: false,
                        stepIndex: stepIndex + 1,
                        finished: stepIndex >= 3,
                    }));
                }
                break;
            case 1:
                if(this.state.deploy_object.git==""){
                    this.setState({
                        errorText_git:"You must specify a valid git url",
                        finished: stepIndex >= 3,
                    });
                    break;
                }
                if (!this.state.loading) {
                    this.dummyAsync(() => this.setState({
                        loading: false,
                        stepIndex: stepIndex + 1,
                        finished: stepIndex >= 3,
                    }));
                }

                break;
            case 2:
                if(this.state.values.length==0){
                    console.log("FUCK")
                    this.setState({
                        error_provider:"You must at least specify one cloud provider",
                        finished: stepIndex >= 3,
                    });
                    break;
                }
                if (!this.state.loading) {
                    this.dummyAsync(() => this.setState({
                        loading: false,
                        stepIndex: stepIndex + 1,
                        finished: stepIndex >= 3,
                    }));
                }
            case 3:
                if (!this.state.loading) {
                    this.dummyAsync(() => this.setState({
                        loading: false,
                        stepIndex: stepIndex + 1,
                        finished: stepIndex >= 3,
                    }));
                }
        }
    };


    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <TextField errorText={this.state.errorText_name} value={this.state.deploy_object.app_id} floatingLabelShrinkStyle={{color:"#263238",fontSize:20}} inputStyle={{color:"#263238"}} underlineFocusStyle={{borderColor:"#80D8FF"}} onChange={(e)=>this.changeValue(e,"app_id")}  style={{margin: 10}} floatingLabelText="App name" />
                        <TextField errorText={this.state.errorText_stack} value={this.state.deploy_object.stack} floatingLabelShrinkStyle={{color:"#263238",fontSize:20}} inputStyle={{color:"#263238"}} underlineFocusStyle={{borderColor:"#80D8FF"}} onChange={(e)=>this.changeValue(e,"stack")} style={{margin: 10}} floatingLabelText="Stack name" />
                    <p style={{margin: 10}} >
                        Enter the name for your application and the corresponding stack name.
                    </p>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <TextField errorText={this.state.errorText_git} value={this.state.deploy_object.git} floatingLabelShrinkStyle={{color:"#263238",fontSize:20}} inputStyle={{color:"#263238"}} underlineFocusStyle={{borderColor:"#80D8FF"}}onChange={(e)=>this.changeValue(e,"git")}  style={{margin: 10,width:600}} floatingLabelText="Git repository url" />
                        <p style={{margin: 10}}>
                            Enter the git repository http/s-url for your application.
                        </p>
                        <p style={{margin: 10}}>Something something whatever cool</p>
                    </div>
                );
            case 2:
                return (
                    <div>
                    <p style={{margin: 10}}>
                        Select the public cloud providers, on which to deploy your application.
                    </p>
                        <SelectField errorText={this.state.error_provider} className="modal-field" onChange={this.handleChangePlatform} multiple={true} floatingLabelText="Public Cloud Provider" value={this.state.values}>
                            {this.menuItems(this.state.values)}
                        </SelectField>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <p style={{margin: 10}}>
                            Review your configuration
                        </p>

                    </div>
                );
        }
    }
    menuItems(values) {
        return platforms.map((name) => (
            <MenuItem
                key={name}
                insetChildren={true}
                checked={values && values.indexOf(name) > -1}
                value={name}
                primaryText={name}
            />
        ));
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};
        if(stepIndex==3){
            return(
                <div style={contentStyle}>
                    <div>{this.getStepContent(stepIndex)}</div>
                    <Paper style={{color:"black",margin:20,padding:20}}>

                    </Paper>
                    <RaisedButton
                        label='Finish'
                        primary={true}
                        buttonStyle={{backgroundColor:this.colors[this.props.type][1]}}
                        onClick={this.onEnd}
                    />
                </div>
            )
        }
        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label='Next'
                        primary={true}
                        buttonStyle={{backgroundColor:this.colors[this.props.type][1]}}
                        onClick={this.handleNext}
                    />
                </div>
            </div>
        );
    }

    testEnd=()=>{
        console.log(this.state.deploy_object)
        this.props.close()
    }
    render() {
        const {loading, stepIndex} = this.state;
        const muiTheme = getMuiTheme({
            stepper: {
                iconColor: this.colors[this.props.type][1], // or logic to change color
            }

        })
        const finished = this.state.finished;
        return (
        <div style={{width: '100%', maxWidth: 700, margin: 30}}>
                <MuiThemeProvider muiTheme={muiTheme}>

                <Stepper  activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Set basic information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Set deploy configuration</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Set cloud environment</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Overview</StepLabel>
                    </Step>
                </Stepper>

                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default AppsStepper;