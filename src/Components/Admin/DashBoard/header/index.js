import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { Component } from "react";
import style from "./style";
import MenuIcon from "@material-ui/icons/Menu";
import { Popover, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./../../../../Constants";
import * as Types from "./../../../../Constants";
function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const popOpen = Boolean(anchorEl);
    const id = popOpen ? "simple-popover" : undefined;
    let { classes, open, handleDrawerOpen } = props;
    // let { open } = this.state;
    const handleLogout = () => {
        props.handleLogout();
    };
    return (
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(
                        classes.menuButton,
                        open && classes.menuButtonHidden
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Link to="/" className={classes.title}>
                    <img
                        src="//cdn.shopify.com/s/files/1/0169/4053/1812/t/2/assets/logo.png?v=162738670026597324"
                        alt=""
                    />
                </Link>

                <div>
                    <span className="d-none d-md-inline">Xin chào</span>
                    <img
                        src={`${Types.SERVER_URL}/${props.user.image}`}
                        width="40"
                        height="40"
                        className={`d-none d-md-inline ${classes.avt}`}
                    />
                    <strong className="d-none d-md-inline">
                        {props.user.user_name}{" "}
                    </strong>
                    <IconButton
                        color="inherit"
                        aria-describedby={id}
                        onClick={handleClick}
                    >
                        <i className="fas fa-cog    "></i>
                    </IconButton>

                    <Popover
                        id={id}
                        open={popOpen}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <div className="p-3 text-center">
                            <Link
                                to="/admin/user"
                                className={classes.link}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="mb-3"
                                >
                                    <i className="fas fa-user-edit mr-2"></i>{" "}
                                    Chỉnh sửa thông tin
                                </Button>
                            </Link>

                            <br />
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                fullWidth
                                onClick={() => handleLogout()}
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>{" "}
                                Đăng xuất
                            </Button>
                        </div>
                    </Popover>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(style)(Header);
