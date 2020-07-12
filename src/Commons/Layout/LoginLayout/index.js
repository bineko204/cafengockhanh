import React from "react";
import { Route } from "react-router-dom";
import DashBoard from "../../../Components/Admin/DashBoard";

function LoginLayout(props) {
    // console.log(props)
    const { component: YourComponent, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(routeProps) => <YourComponent {...routeProps} />}
        />
    );
}

export default LoginLayout;
