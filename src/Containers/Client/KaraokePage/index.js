import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import KaraokeActions from '../../../Components/Client/KaraokePage/KaraokeActions';
import Player from '../../../Components/Client/KaraokePage/Player';
import * as actions from './../../../Actions';
import style from './style';
function KaraokePage(props) {
    const { classes } = props;
    const [acceptDelete, setAcceptDelete] = useState(0);
    const getResult = (data) => {
        let formData = new FormData();
        formData.append('video_id', data.id);
        formData.append('title', data.title);
        formData.append('thumb', data.thumb);
        formData.append('duration', data.duration);
        formData.append('group_customer', data.group_customer);
        props.addVideo(formData);
    };
    useEffect(() => {
        document.title = props.title;
        let obj = setInterval(() => {
            props.getListVideo();
            props.getSiteConfig();
            // if (props.history.location.pathname !== '/karaoke') {
            //     clearInterval(obj);
            // }
        }, 2000);
        window.scrollTo(0, 0);
        props.getAPIKEY();
        return () => {
            clearInterval(obj);
        }
    }, []);

    const nextVideo = (id) => {
        props.nextVideo(id);
    };

    const showDeleteModal = () => {
        props.showModal(true);
        props.changeModalTitle('Hủy chọn bàn');
        let result = 0;
        props.changeModalContent(
            <div className="p-3">
                Sau khi xóa sẽ không thể chọn lại bàn trong 5 phút. Xác nhận?
                <div className="d-flex justify-content-around pt-3 flex-wrap">
                    <Button
                        onClick={() => {
                            setAcceptDelete(1);
                            props.showModal(false);
                        }}
                        variant="contained"
                        size="small"
                        color="primary"
                        className="mb-2"
                    >
                        Đồng ý
                    </Button>
                    <Button
                        onClick={() => props.showModal(false)}
                        variant="contained"
                        size="small"
                        color="secondary"
                        className="mb-2"
                    >
                        Quay lại
                    </Button>
                </div>
            </div>
        );
    };
    return (
        <div className={clsx(classes.wrKaraoke)}>
            <div className={clsx('row no-padding')}>
                <div className={clsx('col-lg-3 ')}>
                    <KaraokeActions
                        result={(data) => getResult(data)}
                        listVideo={props.listVideo}
                        siteConfig={props.siteConfig}
                        API_KEY={props.API_KEY}
                        nextVideo={(id) => nextVideo(id)}
                        changeAPIKEY={() => props.changeAPIKEY()}
                        showDeleteModal={showDeleteModal}
                        acceptDelete={acceptDelete}
                    />
                </div>

                <div
                    className={clsx(classes.wrVideo, 'col-lg-9')}
                    id="wrPlayer"
                >
                    <Player nowPlaying={props.listVideo[0]} />
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        listVideo: state.karaoke.list,
        siteConfig: state.uiSetting.config,
        API_KEY: state.uiSetting.apiKey,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addVideo: (data) => {
            dispatch(actions.addKaraokeVideo(data));
        },
        getListVideo: () => {
            dispatch(actions.getListKaraokeVideoReQuest());
        },
        getSiteConfig: () => {
            dispatch(actions.getListConfig());
        },
        changeSiteConfig: (body) => {
            dispatch(actions.changeSiteConfig(body));
        },
        nextVideo: (id) => {
            dispatch(actions.deleteKaraokeVideo(id));
        },
        getAPIKEY: () => {
            dispatch(actions.getAPIKEY());
        },
        changeAPIKEY: () => {
            dispatch(actions.changeAPIKEY());
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
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(KaraokePage);
