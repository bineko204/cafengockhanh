import { withStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import style from "./style";
import * as actions from "./../../../Actions";
function Home(props) {
    useEffect(() => {
        document.title = props.title;
        localStorage.getItem("userId")
            ? props.getUserInfo(localStorage.getItem("userId"))
            : props.getUserInfo(sessionStorage.userId);
    });
    return <div></div>;
}
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (id) => {
            dispatch(actions.getUserInfo(id));
        },
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(Home);
