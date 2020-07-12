import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import renderTextField from "../../../Commons/formHelper/renderTextField";
import * as actions from "./../../../Actions";
import validate from "./../../../Commons/formHelper/validate";
import style from "./style";
import renderCheckbox from "../../../Commons/formHelper/renderCheckbox";
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://www.facebook.com/storm204lc">
                Trịnh Ngọc Khánh
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function Login(props) {
    const { classes, handleSubmit, redirect } = props;
    
    const handleLogin = (data) => {
        let formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("remember", data.remember ? data.remember : false );
        props.checkLogin(formData);
        // console.log(data);
    };
    useEffect(() => {
        document.title = props.title;
        if(redirect){
            props.history.goBack();
        }
    });
    // console.log(props)
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {sessionStorage.userId ? ("Bạn đã đăng nhập!") : "Đăng nhập"}
                    </Typography>
                    {sessionStorage.userId ? (
                       ""
                    ) : (
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit(handleLogin)}
                        >
                            <Field
                                component={renderTextField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Tên đăng nhập"
                                name="username"
                                autoFocus
                            />
                            <Field
                                component={renderTextField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            <FormControlLabel
                                control={
                                    <Field
                                        color="primary"
                                        name="remember"
                                        margin="dense"
                                        component={renderCheckbox}
                                    />
                                }
                                label="Ghi nhớ đăng nhập"
                                className="ml-0"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Đăng nhập
                            </Button>
                            {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    )}
                </div>
            </Grid>

            {/* {props.redirect && <Redirect to={props.redirect} />} */}
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        redirect: state.uiSetting.redirect,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        checkLogin: (data) => {
            dispatch(actions.login(data));
        },
        showModal: (status) => {
            dispatch(actions.showModal(status));
        },
        changeModalContent: (component) => {
            dispatch(actions.changeModalContent(component));
        },
        changeModalTitle: (title) => {
            dispatch(actions.changeModalTitle(title));
        },
    };
};
const withReduxForm = reduxForm({
    // a unique name for the form
    form: "loginForm",
    validate,
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReduxForm,
    withStyles(style)
)(Login);
