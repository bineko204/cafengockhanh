import { Backdrop, CssBaseline } from "@material-ui/core";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { compose } from "redux";
import AdminLayout from "../../Commons/Layout/AdminLayout";
import LoginLayout from "../../Commons/Layout/LoginLayout";
import MyModal from "../../Components/Admin/Modal";
import NotFound from "../../Components/NotFound";
import * as actions from "./../../Actions";
import theme from "./../../Commons/theme";
import WOW from "wowjs";
import {
    ADMIN_ROUTES,
    LOGIN_ROUTES,
    CLIENT_ROUTES,
} from "./../../Commons/routes/";
import loadingImg from "./../../images/ZKZg.gif";
import style from "./style";
import ClientLayout from "../../Commons/Layout/ClientLayout";
function App(props) {
    const renderAdminRoutes = () => {
        let xhtml = null;
        xhtml = ADMIN_ROUTES.map((route) => {
            return (
                <AdminLayout
                    key={route.path}
                    path={route.path}
                    component={route.main}
                    exact={route.exact}
                />
            );
        });
        return xhtml;
    };
    const renderClientRoutes = () => {
        let xhtml = null;
        xhtml = CLIENT_ROUTES.map((route) => {
            return (
                <ClientLayout
                    key={route.path}
                    path={route.path}
                    component={route.main}
                    exact={route.exact}
                />
            );
        });
        return xhtml;
    };
    const onCloseModal = () => {
        props.onShowModal(false);
    };

    let { classes, openModal, modalTitle, modalContent } = props;
    useEffect(() => {
        new WOW.WOW({ live: false }).init();
        props.getSiteConfig();
        if (sessionStorage.userId || localStorage.getItem("userId")) {
            localStorage.getItem("userId")
                ? props.getUserInfo(localStorage.getItem("userId"))
                : props.getUserInfo(sessionStorage.userId);
        }
    }, []);
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ToastContainer />
                    <Switch>
                        {renderAdminRoutes()}
                        {renderClientRoutes()}
                        <LoginLayout
                            path={LOGIN_ROUTES.path}
                            component={LOGIN_ROUTES.main}
                            exact={LOGIN_ROUTES.exact}
                        />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </ThemeProvider>
            </BrowserRouter>
            <Backdrop className={classes.backdrop} open={props.open}>
                <img src={loadingImg} alt="" className={classes.loadingImg} />
            </Backdrop>
            <MyModal
                title={modalTitle}
                content={modalContent}
                openModal={openModal}
                closeModal={() => onCloseModal()}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        open: state.uiSetting.showBackDrop,
        openModal: state.modal.showModal,
        modalTitle: state.modal.title,
        modalContent: state.modal.component,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: (status) => {
            dispatch(actions.showModal(status));
        },
        getUserInfo: (id) => {
            dispatch(actions.getUserInfo(id));
        },
        getSiteConfig: () => {
            dispatch(actions.getListConfig());
        },
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(App);
