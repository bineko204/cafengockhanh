import { withStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { compose } from "redux";
import style from "./style";
import clsx from "clsx";

function ClientFooter(props) {
    const { classes } = props;
    return (
        <footer className={classes.footer}>
            <div className={clsx("container")}>
                <div className={clsx("row no-padding")}>
                    <div className="col-md-3 p-3 ">
                        <h3 className="pb-4">Cà phê ngọc khánh</h3>
                        <img
                            src="//cdn.shopify.com/s/files/1/0169/4053/1812/t/2/assets/logo.png?v=162738670026597324"
                            alt=""
                        />
                    </div>
                    <div className="col-md-3 p-3">
                        <h3>Địa chỉ: </h3>
                        <p>
                            Khu 7, Thị trấn than uyên, Huyện than Uyên, Tỉnh lai
                            châu
                        </p>
                    </div>
                    <div className="col-md-3 p-3">
                        <h3>Liên hệ: </h3>
                        <p>Số điện thoại: 0979 885 146</p>
                        <p>Email: trinhkhanh.204@gmail.com</p>
                        <p>
                            Mạng xã hội:
                            <a href="http://zalo.me/0979885146" target="_blank">
                                <img
                                    src="https://image.flaticon.com/icons/svg/906/906382.svg"
                                    width="30"
                                    height="30"
                                    className="ml-3"
                                ></img>
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=100011113185226"
                                target="_blank"
                            >
                                <img
                                    src="https://image.flaticon.com/icons/svg/145/145802.svg"
                                    width="30"
                                    height="30"
                                    className="ml-3"
                                ></img>
                            </a>
                        </p>
                    </div>
                    <div className="col-md-3 p-3">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1100.1085567152304!2d103.88848242448398!3d21.96108661292458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdff8d7f3fdccf56a!2zQ2FmZSBOZ-G7jWMgS2jDoW5o!5e0!3m2!1svi!2s!4v1587990879680!5m2!1svi!2s"
                            style={{width: "100%", height: "200px"}}
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className={classes.copyright}>
                <span>
                    Code by{" "}
                    <a href="https://facebook.com/storm204lc" target="_blank">
                        Trịnh Ngọc Khánh
                    </a>
                </span>
            </div>
        </footer>
    );
}

export default compose(withStyles(style))(ClientFooter);
