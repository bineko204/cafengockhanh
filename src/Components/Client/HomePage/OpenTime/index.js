import React from "react";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import style from "./style";
function OpenTime(props) {
    const classes = props.classes;
    return (
        <section id="OpenTime" className={classes.OpenTime}>
            <div className="container text-center">
                <h3
                    className={clsx(
                        "",
                        window.innerWidth >= 960 ? "wow slideInDown" : ""
                    )}
                >
                    Giờ mở cửa:{" "}
                </h3>
                <p>Từ 7h-23h Các ngày trong tuần !</p>
            </div>
        </section>
    );
}

export default withStyles(style)(OpenTime);
