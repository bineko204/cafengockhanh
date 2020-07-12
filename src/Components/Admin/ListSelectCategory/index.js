import React, { Component, Fragment } from "react";
import { MenuItem } from "@material-ui/core";

class ListSelectCategory extends Component {
    render() {
        const {category} = this.props;
        return (
            <Fragment>
                <option value={category.id} key={category.id}>
                    {category.title}
                </option>
                {category.children
                    ? category.children.map((children) => (
                          <option value={children.id} key={children.id}>
                              ---- {children.title}
                          </option>
                      ))
                    : ""}
            </Fragment>
        );
    }
}

export default ListSelectCategory;
