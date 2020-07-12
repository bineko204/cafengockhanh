import React from "react";
import { withStyles } from "@material-ui/styles";
import style from "./style";
import * as Types from "./../../../../Constants";
import { Button } from "@material-ui/core";
function ImageDetail(props) {

    const showDate = (data) => {
        let date = new Date(data * 1000);
        let text = "";
        text += date.getDate() + " - ";
        text += date.getMonth() + 1 + " - ";
        text += date.getFullYear();
        return text;
    };

    const { classes } = props;
    return (
        <div className={`${classes.wrapper} row no-padding`}>
            <div className={`${classes.wrImage} col-md-9`}>
                <img
                    src={`${Types.SERVER_URL}/${props.detail.image}`}
                    alt={props.detail.name}
                    className={classes.image}
                />
            </div>
            <div className={`${classes.imageDetail} col-md-3`}>
                <ul className={classes.ul}>
                    <li className={classes.li}>
                        <span>
                            <strong>
                                Tên
                                ảnh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                            </strong>
                            {props.detail.name}
                        </span>
                    </li>
                    <li className={classes.li}>
                        <span>
                            <strong>Ngày đăng&nbsp;&nbsp;&nbsp;: </strong>
                            {showDate(props.detail.date_created)}
                        </span>
                    </li>
                    <li className={classes.li}>
                        <span>
                            <strong>Kích thước&nbsp;&nbsp;: </strong>
                            {props.detail.size/1000} kb
                        </span>
                    </li>
                    <li className={classes.li}>
                        <span>
                            <strong>
                                Địa
                                chỉ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                            </strong>
                            {`${Types.SERVER_URL}/${props.detail.image}`}{" "}
                        </span>
                    </li>
                </ul>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.buttonDelete}
                >
                    Xóa ảnh
                </Button>
            </div>
        </div>
    );
}

export default withStyles(style)(ImageDetail);
