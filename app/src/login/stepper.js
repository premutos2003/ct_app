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
        finished: false,
        stepIndex: 0,
        providers:[]
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 4,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    backgroundColor="#C5CAE9"
                    label={stepIndex === 4 ? 'Finish' : 'Next'}
                    primary={true}
                    onClick={this.handleNext}
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
            'Amazon Web Services'
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
                <TextField floatingLabelText="Access-Key"></TextField>
                <TextField floatingLabelText="Access-Secret"></TextField>
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
                iconColor: '#C5CAE9', // or logic to change color
            }
        })


        return (
            <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <Stepper iconColor="#263238" activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel><h4>Set credentials</h4></StepLabel>
                        <StepContent>
                            <p>
                                Set your Cosmo login credentials
                            </p>
                            <TextField floatingLabelText="user name"></TextField>
                            <TextField type="password" floatingLabelText="password"></TextField>
                            <TextField type="password" floatingLabelText="confirm password"></TextField>

                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel><h4>Select cloud providers</h4></StepLabel>
                        <StepContent>
                            <p>
                                Select the cloud providers, on which you wish to deploy
                                your applications.
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
                            <TextField floatingLabelText="Git deploy key"></TextField>
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
                    this.props.onLogin()
                )}
                </MuiThemeProvider>
            </div>

        );
    }
}
export default VerticalLinearStepper;
