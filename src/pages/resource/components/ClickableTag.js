import React from 'react';
import { Redirect } from "react-router-dom";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Badge from 'react-bootstrap/Badge';
import "./ClickableTag.css"

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#2e5ab8 !important'
        }
    }
});

export default class clickableTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
    }

    setRedirect = () => {
        this.setState({
            ...this.state,
            redirect: "/results"
        });
    }

    render() {
        
        if(this.state.redirect != null) {
            let searchInfo = {};
            searchInfo.searchString = this.props.tag;
            searchInfo.searchedFields = ['Tags'];
            return <Redirect to={{
                pathname: "/results",
                state: { searchInfo: searchInfo }
            }} />;
        } else {
            return (
                <MuiThemeProvider theme={theme}>
                <Badge 
                    id="badge-click"
                    pill 
                    variant="secondary"
                    onClick={this.setRedirect}>
                    {this.props.tag}
                </Badge>
                </MuiThemeProvider>
            );
        }
        
    }
}