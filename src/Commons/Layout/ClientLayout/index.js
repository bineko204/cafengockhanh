import React from "react";
import { Route } from "react-router-dom";
import Basic from "../../../Containers/Client/Basic";
function ClientLayout(props) {
    // console.log(props)
    const { component: YourComponent, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(routeProps) => (
                <Basic {...routeProps}>
                    <YourComponent {...routeProps} />
                </Basic>
            )}
        />
    );
}

export default ClientLayout;
