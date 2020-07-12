import React, { useEffect, useState } from "react";
import { Paper, Button, TextField } from "@material-ui/core";
import clsx from "clsx";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import validate from "./../../../Commons/formHelper/validate";
import style from "./style";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../../Commons/formHelper/renderTextField";
import * as actions from "./../../../Actions";
import Media from "../Media";
import * as Types from "./../../../Constants";
import { Link } from "react-router-dom";
function User(props) {
    const [imageInfo, setImageInfo] = useState();
    const getImageInfo = (data) => {
        setImageInfo(data);
    };
    const onShowModal = () => {
        props.showModal(true);
        props.changeModalContent(
            <Media type="modal" getImageInfo={(data) => getImageInfo(data)} />
        );
        props.changeModalTitle("Thư viện ảnh");
    };
    useEffect(() => {
        document.title = props.title;
        console.log(props.initialValues);
    });
    const { classes, handleSubmit } = props;
    const onSubmitForm = (data) => {
        let formData = new FormData();
        formData.append("first_name", data.first_name ? data.first_name : "");
        formData.append("last_name", data.last_name ? data.last_name : "");
        formData.append("email", data.email ? data.email : "");
        formData.append("phone", data.phone ? data.phone : "");
        formData.append(
            "description",
            data.description ? data.description : ""
        );
        formData.append(
            "date_of_birth",
            data.date_of_birth
                ? new Date(data.date_of_birth).getTime() / 1000
                : ""
        );
        formData.append("avatar", imageInfo ? imageInfo.id : "1");
        props.updateUserInfo(props.initialValues.id, formData);
        props.history.goBack();
    };

    return (
        <Paper>
            <form
                className="row no-padding"
                onSubmit={handleSubmit(onSubmitForm)}
            >
                <div className="col-md-3 p-2 text-center">
                    <div className={clsx(classes.wrAvatar, "text-center")}>
                        <img
                            src={
                                imageInfo
                                    ? `${Types.SERVER_URL}/${imageInfo.thumb}`
                                    : props.initialValues &&
                                      `${Types.SERVER_URL}/${props.initialValues.thumb}`
                            }
                            alt=""
                            className={classes.avatar}
                        />
                    </div>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="m-3"
                        size="small"
                        onClick={() => onShowModal()}
                    >
                        Đổi ảnh đại diện
                    </Button>
                </div>
                <div className={clsx("col-md-9 p-2 px-3")}>
                    <h5 className={classes.title}>Thông tin quản trị</h5>
                    <div className={clsx(classes.info2, "row no-padding")}>
                        <div className="col-md-12 p-2">
                            <Field
                                name="user_name"
                                component={renderTextField}
                                label="UserName"
                                variant="outlined"
                                disabled
                                size="small"
                                margin="dense"
                            />
                        </div>
                        <div className="col-md-6 p-2">
                            <Field
                                name="first_name"
                                component={renderTextField}
                                label="First Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="dense"
                            />
                        </div>
                        <div className="col-md-6 p-2">
                            <Field
                                name="last_name"
                                component={renderTextField}
                                label="Last Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="dense"
                            />
                        </div>
                        <div className="col-md-4 p-2">
                            <Field
                                name="date_of_birth"
                                component={renderTextField}
                                type="date"
                                label="Ngày sinh"
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                            />
                        </div>
                        <div className="col-md-4 p-2">
                            <Field
                                name="email"
                                component={renderTextField}
                                label="Email"
                                type="email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="dense"
                            />
                        </div>
                        <div className="col-md-4 p-2">
                            <Field
                                name="phone"
                                component={renderTextField}
                                label="Số điện thoại"
                                type="number"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="dense"
                            />
                        </div>

                        <div className="col-12 p-2">
                            <Field
                                name="description"
                                component={renderTextField}
                                label="Giới thiệu"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={4}
                                fullWidth
                                margin="dense"
                            />
                        </div>
                        <div className="col-12 p-2">
                            <Button
                                variant="contained"
                                color="primary"
                                className="mr-3"
                                type="submit"
                            >
                                Lưu lại
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                onClick={() => props.history.goBack()}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Paper>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.uiSetting.user,
        initialValues: state.uiSetting.user,
        enableReinitialize: true,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (id) => {
            dispatch(actions.getUserInfo(id));
        },
        showModal: () => {
            dispatch(actions.showModal());
        },
        changeModalContent: (component) => {
            dispatch(actions.changeModalContent(component));
        },
        changeModalTitle: (title) => {
            dispatch(actions.changeModalTitle(title));
        },
        updateUserInfo: (id, body) => {
            dispatch(actions.updateUserInfo(id, body));
        },
    };
};
const withReduxForm = reduxForm({
    // a unique name for the form
    form: "userForm",
    validate,
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReduxForm,
    withStyles(style)
)(User);
