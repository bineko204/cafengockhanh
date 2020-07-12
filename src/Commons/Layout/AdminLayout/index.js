import React from "react";
import { Route, Redirect } from "react-router-dom";
import DashBoard from "./../../../Containers/Admin/Dashboard";
function AdminLayout(props) {
    // console.log(props)
    const { component: YourComponent, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                sessionStorage.userId ? (
                    <DashBoard>
                        <YourComponent {...routeProps} />
                    </DashBoard>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default AdminLayout;
