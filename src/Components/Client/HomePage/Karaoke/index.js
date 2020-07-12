import React from "react";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import style from "./style";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
function Karaoke(props) {
    const classes = props.classes;
    return (
        <section id="karaoke" className={classes.karaoke}>
            <div className="container text-center text-white">
                <h3>Karaoke - Hát cho nhau nghe</h3>
                <h5>Chỉ có tại Cà Phê Ngọc Khánh</h5>
                <div className="p-2">
                    <ul className="d-inline-block text-left">
                        <li> <i className="fas fa-check-circle"></i> Bộ máy chiếu có độ phân giải FULL HD</li>
                        <li> <i className="fas fa-check-circle"></i> Màn chiếu 150 inch</li>
                        <li> <i className="fas fa-check-circle"></i> Dàn âm thanh chất lượng cao</li>
                        <li> <i className="fas fa-check-circle"></i> Chức năng chọn bài hát trực tuyến qua Smartphone</li>
                    </ul>
                </div>
 
                <Link to="/karaoke">
                    <Button variant="contained" color="secondary">
                        Chọn bài ngay!
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default withStyles(style)(Karaoke);
