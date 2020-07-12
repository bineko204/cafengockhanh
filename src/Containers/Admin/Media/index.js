import { Button, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ImageDetail from "../../../Components/Admin/Media/ImageDetail";
import * as actions from "./../../../Actions";
import * as Types from "./../../../Constants";
import style from "./style";
function Media(props) {
    const {
        classes,
        type,
        showModal,
        changeModalContent,
        changeModalTitle,
        list,
    } = props;
    const [acceptSelect, setAcceptSelect] = useState(false);
    const [multiSelect, setMultiSelect] = useState(true);
    const [selected, setSelected] = useState([]);
    const renderListImage = (list) => {
        let xhtml = null;
        xhtml = list.map((image) => {
            return (
                <div
                    className={`${classes.imgItem} ${checkActive(image.id)}`}
                    onClick={() => handleClick(image)}
                    key={image.id}
                >
                    <img
                        src={`${Types.SERVER_URL}/${image.thumb}`}
                        alt={image.name}
                        className={classes.image}
                    />
                </div>
            );
        });
        return xhtml;
    };

    const handleClick = (image) => {
        if (acceptSelect === false) {
            // console.log(image);

            if (type === "page") {
                showModal(true);
                changeModalContent(<ImageDetail detail={image} />);
                changeModalTitle("Chi tiết hình ảnh");
            }
        }
        if (acceptSelect === true) {
            const id = image.id;
            const selectedIndex = selected.findIndex((item) => {
                return id === item.id;
            });
            let newSelected = [];
            if (multiSelect === true) {
                if (selectedIndex === -1) {
                    newSelected = newSelected.concat(selected, image);
                } else if (selectedIndex === 0) {
                    newSelected = newSelected.concat(selected.slice(1));
                } else if (selectedIndex === selected.length - 1) {
                    newSelected = newSelected.concat(selected.slice(0, -1));
                } else if (selectedIndex > 0) {
                    newSelected = newSelected.concat(
                        selected.slice(0, selectedIndex),
                        selected.slice(selectedIndex + 1)
                    );
                }
                setSelected(newSelected);
            } else {
                if (selectedIndex === -1) {
                    newSelected = [image];
                } else if (selectedIndex === 0) {
                    newSelected = [];
                }
                setSelected(newSelected);
            }
        }
    };
    const checkActive = (id) => {
        const Index = selected.findIndex((item) => {
            return id === item.id;
        });
        if (Index === -1) {
            return "";
        } else {
            return "imgSelected";
        }
    };

    const renderImageInfo = (image) => {
        const { classes } = props;

        if (image) {
            return (
                <Fragment key={image.id}>
                    <h3>Chi tiết hình ảnh</h3>
                    <img
                        src={`${Types.SERVER_URL}/${image.image}`}
                        alt={image.name}
                        style={{ width: "100%", margin: "10px auto" }}
                    />
                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <span>
                                <strong>
                                    Tên
                                    ảnh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                                </strong>
                                {image.name}
                            </span>
                        </li>
                        <li className={classes.li}>
                            <span>
                                <strong>Ngày đăng&nbsp;&nbsp;&nbsp;: </strong>
                                {image.dateCreated}
                            </span>
                        </li>
                        <li className={classes.li}>
                            <span>
                                <strong>Kích thước&nbsp;&nbsp;: </strong>
                                {image.size} kb
                            </span>
                        </li>
                        <li className={classes.li}>
                            <span>
                                <strong>
                                    Địa
                                    chỉ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                                </strong>
                                {image.image}{" "}
                            </span>
                        </li>
                    </ul>
                </Fragment>
            );
        } else {
            return "";
        }
    };
    useEffect(() => {
        document.title = "Thư viện ảnh";
        props.getListimage();
        if (type === "modal") {
            setMultiSelect(false);
            setAcceptSelect(true);
        }
    }, []);

    const handleDelete = (data) => {
        props.deleteImage(data);
        setAcceptSelect(false);
        setSelected([]);
    };
    const renderDeleteButton = () => {
        if (acceptSelect === true) {
            return (
                <Fragment>
                    <span style={{ lineHeight: "30px" }}>
                        Hãy chọn ảnh muốn xóa
                    </span>
                    <div>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className="mx-3"
                            onClick={() => handleDelete(selected)}
                            disabled={selected.length ? false : true}
                        >
                            Xóa ảnh đã chọn
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => {
                                setSelected([]);
                                setAcceptSelect(false);
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                        setMultiSelect(true);
                        setAcceptSelect(true);
                    }}
                >
                    Xóa nhiều ảnh
                </Button>
            );
        }
    };

    const handleUpload = () => {
        props.getImageInfo(selected[0]);
        showModal(false);
    };

    const renderUploadButton = () => {
        if (selected.length > 0) {
            return (
                <div>
                    <span style={{ lineHeight: "30px" }}>Đăng ảnh đã chọn</span>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className="mx-3"
                        disabled={selected.length ? false : true}
                        onClick={() => handleUpload()}
                    >
                        Đăng ảnh
                    </Button>
                </div>
            );
        } else {
            return (
                <div className="d-flex justify-content-between">
                    <label htmlFor="upload-button" className="mb-0">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            component="span"
                            // margin="dense"
                        >
                            Tải ảnh mới
                        </Button>
                    </label>
                    <div>
                        <input
                            id="upload-button"
                            type="file"
                            name="image"
                            accept=".jpg, .png, .jpeg"
                            onChange={onUploadImage}
                            className="d-none"
                        />
                    </div>
                </div>
            );
        }
    };

    const onUploadImage = (e) => {
        let formData = new FormData();
        for (var x = 0; x < e.target.files.length; x++) {
            formData.append("image[]", e.target.files[x]);
        }

        props.addImage(formData);
    };
    return (
        <div
            style={
                type === "modal"
                    ? { height: "80vh", width: "80vw" }
                    : { height: "100%" }
            }
        >
            {type === "page" && (
                <div className="row no-padding">
                    <h1 className={classes.title}>Thư viện ảnh</h1>
                </div>
            )}
            <Paper className="row p-2 no-padding">
                <div className="col-md-9 d-flex flex-wrap">
                    {acceptSelect === false && (
                        <div className="mr-3">
                            <label
                                htmlFor="contained-button-file"
                                className="mb-0"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    component="span"
                                    // margin="dense"
                                >
                                    Tải ảnh lên
                                </Button>
                            </label>
                            <div>
                                <input
                                    id="contained-button-file"
                                    type="file"
                                    name="image[]"
                                    multiple
                                    accept=".jpg, .png, .jpeg"
                                    onChange={onUploadImage}
                                    className="d-none"
                                />
                            </div>
                        </div>
                    )}
                    {type === "page" && renderDeleteButton()}
                    {type === "modal" && renderUploadButton()}
                </div>
            </Paper>

            {type === "page" && (
                <Paper variant="outlined" className="row mt-3 p-2 no-padding">
                    <div className="col-12 d-flex flex-wrap justify-content-start ">
                        {renderListImage(list)}
                    </div>
                </Paper>
            )}
            {type === "modal" && (
                <Paper
                    variant="outlined"
                    className="row mt-3 p-2 no-padding"
                    style={{ height: "100%" }}
                >
                    <div className="col-md-9 d-flex flex-wrap justify-content-start overflow-scroll">
                        {renderListImage(list)}
                    </div>
                    <div className="col-md-3 d-none d-md-block p-3">
                        {renderImageInfo(selected[0])}
                    </div>
                </Paper>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        list: state.media.listImage,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (status) => {
            dispatch(actions.showModal(status));
        },
        changeModalContent: (component) => {
            dispatch(actions.changeModalContent(component));
        },
        changeModalTitle: (title) => {
            dispatch(actions.changeModalTitle(title));
        },
        getListimage: () => {
            dispatch(actions.getListImageReQuest());
        },
        addImage: (body) => {
            dispatch(actions.addImageReQuest(body));
        },
        deleteImage: (body) => {
            dispatch(actions.deleteImageReQuest(body));
        },
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(Media);
