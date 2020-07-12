import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./style";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
const CustomMenuLink = (props) => {
    return (
        <NavLink
            to={props.to}
            exact={props.exact}
            style={{ textDecoration: "none" }}
        >
            <ListItem button>
                <ListItemIcon>
                    <i className={`${props.iconClassname} fontsize-large`}></i>
                </ListItemIcon>
                <ListItemText primary={props.label} />
            </ListItem>
        </NavLink>
    );
};

class Sidebar extends Component {
    render() {
        let { classes, open, handleDrawerClose } = this.props;
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <CustomMenuLink
                        to="/admin"
                        exact={true}
                        label="Trang chủ"
                        iconClassname="fas fa-home"
                    />
                </List>
                <Divider />
                <List>
                    <CustomMenuLink
                        to="/admin/products"
                        exact={false}
                        label="Sản phẩm"
                        iconClassname="fas fa-calendar"
                    />
                    <CustomMenuLink
                        to="/admin/product-category"
                        exact={false}
                        label="Danh mục sản phẩm"
                        iconClassname="fas fa-address-book"
                    />
                </List>
                <Divider />
                <List>
                    <CustomMenuLink
                        to="/admin/articles"
                        exact={true}
                        label="Bài viết"
                        iconClassname="fas fa-paste"
                    />
                    <CustomMenuLink
                        to="/admin/article-category"
                        exact={true}
                        label="Danh mục bài viết"
                        iconClassname="fas fa-tags"
                    />
                </List>
                <Divider />
                <List>
                    <CustomMenuLink
                        to="/admin/media"
                        exact={true}
                        label="Thư viện ảnh"
                        iconClassname="fas fa-image"
                    />
                </List>
            </Drawer>
        );
    }
}

export default withStyles(style)(Sidebar);
