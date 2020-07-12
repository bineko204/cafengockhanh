import {
    Button,
    ClickAwayListener,
    Drawer,
    IconButton,
    Popover,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { SERVER_URL } from './../../../Constants';
import style from './style';
import WebConfig from './WebConfig';

function ClientHeader(props) {
    const { classes, productCate, products } = props;
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [state, setState] = useState(false);
    const [offset, setOffset] = useState(0);
    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickAway = () => {
        setShowSubMenu(false);
    };
    const listMenuItem = () => {
        let xhtml = null;
        xhtml = (
            <ul className={clsx(classes.siteNav)}>
                <li className={clsx(classes.menuItem)}>
                    <NavLink exact activeClassName="nav-active" to="/">
                        Trang chủ
                    </NavLink>
                </li>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <li
                        className={clsx(
                            classes.menuItem,
                            classes.hasChild,

                            showSubMenu ? classes.show : classes.hide
                        )}
                        onClick={toggleSubMenu}
                    >
                        <span className="cursor-pointer text-white text-transform-uppercase">
                            <NavLink
                                className="disabled-link"
                                activeClassName="nav-active"
                                to="/product"
                            >
                                Thực đơn <i className="fas fa-angle-down"></i>{' '}
                            </NavLink>
                        </span>

                        <div className={clsx(classes.childMenu, 'no-padding')}>
                            <ul className={clsx('no-padding')}>
                                <li className="row no-padding">
                                    {productCate.map((cate) => {
                                        if (+cate.id !== 1 && cate.status)
                                            return (
                                                <div
                                                    className={clsx('col-lg-4')}
                                                    key={cate.id}
                                                >
                                                    <h5 className="">
                                                        {cate.title}
                                                    </h5>
                                                    <ul
                                                        className={clsx(
                                                            classes.menuLv3,
                                                            'p-0'
                                                        )}
                                                    >
                                                        {products &&
                                                            products.map(
                                                                (product) => {
                                                                    if (
                                                                        product.category_id ===
                                                                            cate.id &&
                                                                        +product.status
                                                                    ) {
                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    product.id
                                                                                }
                                                                            >
                                                                                <Link
                                                                                    to={`/product/${product.id}/${product.slug}.html`}
                                                                                    style={{
                                                                                        lineHeight:
                                                                                            '20px',
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-angle-right pr-2"></i>
                                                                                    {
                                                                                        product.title
                                                                                    }
                                                                                </Link>
                                                                            </li>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                    </ul>
                                                </div>
                                            );
                                    })}
                                </li>
                            </ul>
                        </div>
                    </li>
                </ClickAwayListener>

                <li className={clsx(classes.menuItem)}>
                    <NavLink
                        activeClassName="nav-active"
                        to="/karaoke"
                        className={classes.hot}
                    >
                        Hát cho nhau nghe
                    </NavLink>
                </li>
                <li className={clsx(classes.menuItem)}>
                    <NavLink
                        activeClassName="nav-active"
                        to="/post/1/gioi-thieu.html"
                    >
                        Giới thiệu
                    </NavLink>
                </li>
                <li className={clsx(classes.menuItem)}>
                    <NavLink
                        activeClassName="nav-active"
                        to="/post/2/lien-he.html"
                    >
                        Liên hệ
                    </NavLink>
                </li>
            </ul>
        );
        return xhtml;
    };

    const renderMobileMenu = () => (
        <React.Fragment>
            <IconButton onClick={toggleDrawer(true)}>
                <i className="fas fa-bars text-white"></i>
            </IconButton>
            <Drawer open={state} onClose={toggleDrawer(false)}>
                {listMenuItem()}
            </Drawer>
        </React.Fragment>
    );

    const popOpen = Boolean(anchorEl);
    const id = popOpen ? 'simple-popover' : undefined;
    const handleLogout = () => {
        handleClose();
        sessionStorage.removeItem('userId');
        props.handleLogout();
    };
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setOffset(window.pageYOffset);
        });
        return () => {
            window.removeEventListener('scroll', () => {
                setOffset(window.pageYOffset);
            });
        };
    });
    return (
        <header className={classes.wrHeader}>
            <div
                id="siteHeader"
                className={clsx(
                    classes.siteHeader,
                    'row no-padding',
                    offset > 60 ? classes.opacity : '',
                    props.match.path === '/' ? classes.isHomePage : ''
                )}
            >
                <div className={clsx('col-4 col-lg-2')}>
                    {props.match.url === '/' ? (
                        <h1 className={clsx('m-0')}>
                            <a
                                href="/"
                                className={clsx(
                                    'd-inline-block',
                                    classes.wrLogo
                                )}
                            >
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/t/2/assets/logo.png?v=162738670026597324"
                                    alt=""
                                    className={clsx(classes.logo)}
                                />
                            </a>
                        </h1>
                    ) : (
                        <h2 className={clsx('m-0')}>
                            <a
                                href="/"
                                className={clsx(
                                    'd-inline-block',
                                    classes.wrLogo
                                )}
                            >
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/t/2/assets/logo.png?v=162738670026597324"
                                    alt=""
                                    className={clsx(classes.logo)}
                                />
                            </a>
                        </h2>
                    )}
                </div>
                <div className={clsx(' col-lg-8 ', classes.wrMenu)}>
                    <nav className={clsx(classes.navBar)}>
                        {window.innerWidth > 960 ? listMenuItem() : ''}
                    </nav>
                </div>
                <div
                    className={clsx(
                        'col-8 col-lg-2 d-flex justify-content-end'
                    )}
                >
                    <div className={classes.wrSearch}>
                        <IconButton color="inherit" className={classes.user}>
                            <i className="fas fa-search"></i>
                        </IconButton>
                    </div>
                    <div className="d-flex">
                        <WebConfig />
                    </div>
                    <div className={classes.wrUser}>
                        <IconButton
                            color="inherit"
                            aria-describedby={id}
                            onClick={handleClick}
                            className={classes.user}
                        >
                            {(sessionStorage.userId ||
                                localStorage.getItem('userId')) &&
                            props.user ? (
                                <img
                                    src={`${SERVER_URL}/${props.user.thumb}`}
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                    }}
                                />
                            ) : (
                                <i className="fas fa-user"></i>
                            )}
                        </IconButton>

                        <Popover
                            id={id}
                            open={popOpen}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            style={{ zIndex: 999999999999999 }}
                        >
                            <div className="p-2 text-center">
                                {sessionStorage.userId ||
                                localStorage.getItem('userId') ? (
                                    <div style={{ maxWidth: 200 }}>
                                        <p className="d-block mb-2">
                                            Xin chào,{' '}
                                            <strong>
                                                {props.user.first_name}{' '}
                                                {props.user.last_name}
                                            </strong>
                                        </p>
                                        <Link to="/admin">
                                            <Button
                                                className="mb-2"
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                            >
                                                Vào trang quản trị
                                            </Button>
                                        </Link>

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            fullWidth
                                            onClick={handleLogout}
                                        >
                                            <i className="fas fa-sign-out pr-2"></i>{' '}
                                            Đăng xuất
                                        </Button>
                                    </div>
                                ) : (
                                    <Link to="/login">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            fullWidth
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Popover>
                    </div>
                    <div className={classes.wrMobileMenu}>
                        {renderMobileMenu()}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default compose(withStyles(style))(ClientHeader);
