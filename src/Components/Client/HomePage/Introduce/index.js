import React from "react";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import style from "./style";
function Introduce(props) {
    const { classes } = props;
    return (
        <section id="introduce" className={clsx(classes.introduce)}>
            <div className="container">
                <div className="row no-padding">
                    <h3
                        className={clsx(
                            classes.title,
                            "col-12 text-center",
                            window.innerWidth >=  960 ? " wow zoomIn": ""
                        )}
                    >
                        Tận hưởng những phút giây thư giãn tại <br />
                        <strong>Cà Phê Ngọc Khánh</strong>
                    </h3>
                    <div className={clsx(classes.left, "col-lg-4 col-md-6")}>
                        <div className={clsx("item ", window.innerWidth >=  960 ? " wow zoomIn": "" )} data-wow-delay="0.1s">
                            <div className="image">
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/files/6_60x60.png?v=1571309414"
                                    alt=""
                                />
                            </div>
                            <div className="text">
                                <h5>Không gian rộng rãi</h5>
                            </div>
                        </div>
                        <div className={clsx("item", window.innerWidth >=  960 ? "  wow zoomIn": "" )} data-wow-delay="0.2s">
                            <div className="image">
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/files/6_60x60.png?v=1571309414"
                                    alt=""
                                />
                            </div>
                            <div className="text">
                                <h5>Phục vụ nhiệt tình, chu đáo</h5>
                            </div>
                        </div>
                        <div className={clsx("item ", window.innerWidth >=  960 ? "wow zoomIn": "" )} data-wow-delay="0.3s">
                            <div className="image">
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/files/6_60x60.png?v=1571309414"
                                    alt=""
                                />
                            </div>
                            <div className="text">
                                <h5>Giá cả hợp lý</h5>
                            </div>
                        </div>
                    </div>
                    <div
                        className={clsx(classes.center, "col-lg-4 text-center")}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Coffee_cup_icon.svg/1200px-Coffee_cup_icon.svg.png"
                            alt=""
                        />
                    </div>
                    <div className={clsx(classes.right, "col-lg-4 col-md-6")}>
                        <div className={clsx("item ", window.innerWidth >=  960 ? "wow zoomIn": "" )} data-wow-delay="0.1s">
                            <div className="image">
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/files/6_60x60.png?v=1571309414"
                                    alt=""
                                />
                            </div>
                            <div className="text">
                                <h5>Đồ uống chất lượng, đảm bảo</h5>
                            </div>
                        </div>
                        <div className={clsx("item ", window.innerWidth >=  960 ? "wow zoomIn": "" )} data-wow-delay="0.2s">
                            <div className="image">
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/files/6_60x60.png?v=1571309414"
                                    alt=""
                                />
                            </div>
                            <div className="text">
                                <h5>Màn chiếu 150 inch</h5>
                            </div>
                        </div>
                        <div className={clsx("item ", window.innerWidth >=  960 ? "wow zoomIn": "" )} data-wow-delay="0.3s">
                            <div className="image">
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/files/6_60x60.png?v=1571309414"
                                    alt=""
                                />
                            </div>
                            <div className="text">
                                <h5>Dàn âm thanh chất lượng cao</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default withStyles(style)(Introduce);
