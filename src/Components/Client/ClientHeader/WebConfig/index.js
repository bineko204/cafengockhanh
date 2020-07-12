import {
    Button,
    FormControlLabel,
    IconButton,
    Popover,
    Switch,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from './../../../../Actions';
import Axios from 'axios';
const WebConfig = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // ==========Popover
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // =============
    // =========Switch=========
    const handleAcceptSearch = (event) => {
        let formData = new FormData();
        formData.append(
            'open_karaoke',
            event.target.checked === true ? '1' : '0'
        );
        props.changeSiteConfig(formData);
    };
    const handleSearchCooldown = (event) => {
        let formData = new FormData();
        formData.append(
            'search_cooldown',
            event.target.checked === true ? '1' : '0'
        );
        props.changeSiteConfig(formData);
    };
    const handleIpCheck = (event) => {
        let formData = new FormData();
        formData.append(
            'open_ip_check',
            event.target.checked === true ? '1' : '0'
        );
        props.changeSiteConfig(formData);
    };
    const handleFullScreen = () => {
        var element = document.querySelector('#wrPlayer');
        if (element) {
            element.requestFullscreen();
            handleClose();
        }
    };
    const checkOpenKaraoke = +props.siteConfig.open_karaoke;
    const checkSearchCooldown = +props.siteConfig.search_cooldown;
    const checkOpenIpCheck = +props.siteConfig.open_ip_check;

    const handleUpdateIp = () => {
        Axios.get('http://www.geoplugin.net/json.gp')
            .then((res) => {
                let formData = new FormData();
                formData.append('ip_address', res.data.geoplugin_request);
                props.changeSiteConfig(formData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteAll = () => {
        props.showModal(true);
        props.changeModalTitle('Xóa tất cả bài hát');
        props.changeModalContent(
            <div className="p-3">
                <p>Bạn chắc chắn muốn xóa danh sách phát ?</p>
                <div className="d-flex justify-content-around">
                    <Button
                        margin="none"
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            props.nextVideo('all');
                            props.showModal(false);
                            handleClose();
                        }}
                    >
                        Xóa
                    </Button>
                    <Button
                        margin="none"
                        size="small"
                        variant="contained"
                        onClick={() => props.showModal(false)}
                    >
                        Trở về
                    </Button>
                </div>
            </div>
        );
    };
    // ==============
    if (sessionStorage.userId || localStorage.getItem('userId')) {
        return (
            <Fragment>
                <IconButton
                    color="inherit"
                    aria-describedby={id}
                    onClick={handleClick}
                >
                    <i className="fas fa-cog text-white"></i>
                </IconButton>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    style={{ zIndex: 9999999999999999 }}
                >
                    <div className="p-2">
                        <div>
                            <FormControlLabel
                                label="Cho phép tìm kiếm"
                                control={
                                    <Switch
                                        checked={
                                            checkOpenKaraoke !== NaN
                                                ? !!checkOpenKaraoke
                                                : false
                                        }
                                        onChange={handleAcceptSearch}
                                        name="open_karaoke"
                                        color="primary"
                                    />
                                }
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                label="Bật chế độ hàng chờ"
                                control={
                                    <Switch
                                        checked={
                                            checkSearchCooldown !== NaN
                                                ? !!checkSearchCooldown
                                                : false
                                        }
                                        onChange={handleSearchCooldown}
                                        name="search_cooldown"
                                        color="primary"
                                    />
                                }
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                label="Bật kiểm tra IP"
                                control={
                                    <Switch
                                        checked={
                                            checkOpenIpCheck !== NaN
                                                ? !!checkOpenIpCheck
                                                : false
                                        }
                                        onChange={handleIpCheck}
                                        name="open_ip_check"
                                        color="primary"
                                    />
                                }
                            />
                            {checkOpenIpCheck ? (
                                <Button
                                    margin="none"
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdateIp}
                                >
                                    Cập nhật IP
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                fullWidth
                                className="my-2"
                                onClick={handleFullScreen}
                            >
                                Toàn màn hình
                            </Button>
                        </div>
                        <div className="text-center">
                            <Button
                                margin="none"
                                size="small"
                                variant="contained"
                                color="secondary"
                                disabled={
                                    props.listVideo.length > 0 ? false : true
                                }
                                fullWidth
                                // onClick={() => props.nextVideo("all")}
                                onClick={handleDeleteAll}
                            >
                                Xóa danh sách phát
                            </Button>
                        </div>
                    </div>
                </Popover>
            </Fragment>
        );
    } else return '';
};

const mapStateToProps = (state) => {
    return {
        listVideo: state.karaoke.list,
        siteConfig: state.uiSetting.config,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeSiteConfig: (body) => {
            dispatch(actions.changeSiteConfig(body));
        },
        nextVideo: (id) => {
            dispatch(actions.deleteKaraokeVideo(id));
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
export default compose(connect(mapStateToProps, mapDispatchToProps))(WebConfig);
