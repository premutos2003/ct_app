import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
const muiTheme = getMuiTheme({
    palette :{
        textColor: "#37474F",
    },
    appBar : {
        height : 50,

    },
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <App />

    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();

