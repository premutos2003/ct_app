/**
 * Created by alessandrofurkim on 11.02.18.
 */
import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider'
/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends React.Component {

    state = {
        values:[],
        user:{ name:"",
            password:"",
            password_confirm:"",
            AWS:{acc_key:"",
                acc_sec:"",},
            GCP:{ acc_key:"",
                acc_sec:"",},

        git_key:""},
        errorText_name:"",
        errorText_password:"",
        errorText_password_confirm:"",
        errorText_provider:"",
        finished: false,
        stepIndex: 0,
        providers:[]
    };

    handleNext = (step) => {
        const {stepIndex} = this.state;
        switch(step){
            case 0:
                if(this.state.user.name==""){
                    this.setState({
                        errorText_name:"You must specify a user name",
                        finished: stepIndex >= 4,
                    });
                    break;
                }
                if(this.state.user.password==""){
                    this.setState({
                        errorText_password:"You must specify a password",
                        finished: stepIndex >= 4,
                    });
                    break;
                }
                if(this.state.user.password_confirm=="" || this.state.user.password_confirm!=this.state.user.password){
                    this.setState({
                        errorText_password_confirm:"Passwords doesn't match",
                        finished: stepIndex >= 4,
                    });
                    break;
                }
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 4,
                });
                break;
            case 1:
                if(this.state.values.length==0){
                    this.setState({
                        stepIndex: stepIndex + 2,
                        finished: stepIndex >= 4,
                    });
                    break;
                }
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 4,
                });
                break;
            case 2:
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 4,
                });
            case 3:
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 4,
                });
            case 4:
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 4,
                });
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };
    changeValue = (e,type,subtype) => {
        const value = e.target.value;
        var user = this.state.user
        if(subtype==null){
            user[type] = value;
        }
        else{user[subtype][type] = value;}
        this.setState({user:user});
    }

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    buttonStyle={{backgroundColor:"#80D8FF"}}
                    label={stepIndex === 4 ? 'Finish' : 'Next'}
                    primary={true}
                    onClick={()=>this.handleNext(step)}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }
    handleChangePlatform = (event, index, values) => {
        console.log(values,"gANDLE EVEN")
        this.setState({values:values});
        this.providers(values)
    }
    menuItems(values) {
        const platforms = [
            'AWS',"GCP"
        ];
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
    providers = (values)=>{
        let p =[]
        values.map((name) => (
            p.push(
                <div>
                <TextField onChange={(e)=>this.changeValue(e,"acc_key",name)} floatingLabelText="Access-Key"></TextField>
                <TextField onChange={(e)=>this.changeValue(e,"acc_sec",name)} floatingLabelText="Access-Secret"></TextField>
                <Chip>{name}</Chip>
                </div>
            )
        ));
        this.setState({providers:p})
    }
    render() {
        const {finished, stepIndex} = this.state;
        const muiTheme = getMuiTheme({
            stepper: {
                iconColor: '#80D8FF', // or logic to change color
            }


        })


        return (
            <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <Stepper  activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel><h4>Set credentials</h4></StepLabel>
                        <StepContent>
                            <p>
                                Set your Cosmo login credentials
                            </p>
                            <TextField floatingLabelShrinkStyle={{color:"#263238",fontSize:20}} inputStyle={{color:"#263238"}} underlineFocusStyle={{borderColor:"#80D8FF"}} value={this.state.user.name} errorText={this.state.errorText_name} onChange={(e)=>this.changeValue(e,"name",null)} floatingLabelText="User name"></TextField>
                            <TextField floatingLabelShrinkStyle={{color:"#263238",fontSize:20}}  inputStyle={{color:"#263238"}}  underlineFocusStyle={{borderColor:"#80D8FF"}} value={this.state.user.password}errorText={this.state.errorText_password} onChange={(e)=>this.changeValue(e,"password",null)}type="password" floatingLabelText="password"></TextField>
                            <TextField floatingLabelShrinkStyle={{color:"#263238",fontSize:20}}  inputStyle={{color:"#263238"}}  underlineFocusStyle={{borderColor:"#80D8FF"}} value={this.state.user.password_confirm}errorText={this.state.errorText_password_confirm} onChange={(e)=>this.changeValue(e,"password_confirm",null)}type="password" floatingLabelText="confirm password"></TextField>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel><h4>Select cloud providers</h4></StepLabel>
                        <StepContent>
                            <p>
                                Select the cloud providers, on which you wish to deploy
                                your applications.
                                Leave Empty to configure it later
                            </p>
                            <SelectField onChange={this.handleChangePlatform} multiple={true} floatingLabelText="Public Cloud Provider" value={this.state.values}>
                                {this.menuItems(this.state.values)}
                            </SelectField>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel><h4>Set cloud provider credentials</h4></StepLabel>
                        <StepContent>
                            <Divider></Divider>
                            <p>Integrate Cosmo with your cloud providers by specifying access-key pairs
                            </p>
                            {this.state.providers}
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel><h4>Integrate Git</h4></StepLabel>
                        <StepContent>
                            <p>Integrate Cosmo with your Git repository by specifying a deploy key</p>
                            <TextField onChange={(e)=>this.changeValue(e,"git_key")} floatingLabelText="Git deploy key"></TextField>
                            {this.renderStepActions(3)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel><h4>Complete setup</h4></StepLabel>
                        <StepContent>
                            <p>
                                That's it!
                                All systems go
                            </p>
                            {this.renderStepActions(4)}
                        </StepContent>
                    </Step>
                </Stepper>

                {finished && (
                    this.props.onRegister(this.state.user)
                )}
                </MuiThemeProvider>
            </div>

        );
    }
}
export default VerticalLinearStepper;
