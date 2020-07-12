import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import style from "./style";
import Header from "./../../../Components/Admin/DashBoard/header";
import Sidebar from "./../../../Components/Admin/DashBoard/sidebar";
import { compose } from "redux";
import * as actions from "./../../../Actions";
import { connect } from "react-redux";
import { SERVER_URL } from "./../../../Constants";
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class DashBoard extends Component {
    handleDrawerOpen = () => {
        this.props.showAdminSidebar(true);
    };
    handleDrawerClose = () => {
        this.props.showAdminSidebar(false);
    };

    render() {
        let { classes, openSidebar } = this.props;
        return (
            <div className={classes.root}>
                <Header
                    open={openSidebar}
                    handleDrawerOpen={this.handleDrawerOpen}
                    user={this.props.user}
                    handleLogout={() => {
                        this.props.logOut();
                        window.location.assign(`${SERVER_URL}/admin`);
                    }}
                />
                <Sidebar
                    open={openSidebar}
                    handleDrawerClose={this.handleDrawerClose}
                />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Box>{this.props.children}</Box>
                        <Box pt={4} className={classes.copyRight}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.uiSetting.user,
        openSidebar: state.uiSetting.showAdminSidebar,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        showAdminSidebar: (status) => {
            dispatch(actions.showAdminSidebar(status));
        },
        logOut: () => {
            dispatch(actions.logout());
        },
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(DashBoard);
