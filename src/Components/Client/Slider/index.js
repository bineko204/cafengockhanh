import React, { useEffect } from "react";
import { compose } from "redux";
import style from "./style";
import { withStyles } from "@material-ui/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "./../../../images/slider.jpg";
import img2 from "./../../../images/slider2.jpg";
function MainSlider(props) {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        swipe: false,
        autoplaySpeed: 4000,
    };

    let imgWidth = window.innerWidth;
    let imgHeight = imgWidth / 2.3;
    const { classes } = props;
    useEffect(() => {});
    return (
        <section className={classes.wrSlider} id="slider">
            <Slider {...settings}>
                <div className={classes.sliderItem}>
                    <img src={img1} height={imgHeight} />
                    <div className={classes.content}>
                        <div>
                            <div className={classes.icon}>
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/files/coffeeicon--2_small.png?v=1551165144"
                                    alt=""
                                    className="wow bounceIn d-none d-md-block"
                                    data-wow-delay="0.25s"
                                />
                            </div>
                            <div className={classes.text}>
                                <p className="wow zoomIn">
                                    Điểm đến lý tưởng <br />
                                    để
                                    <br />{" "}
                                    <strong
                                        className="wow bounceIn"
                                        data-wow-delay="1s"
                                    >
                                        hội họp
                                    </strong>
                                </p>
                                <div>Ăn, uống và hưởng thụ!</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.sliderItem}>
                    <img
                        src={img2}
                        height={imgHeight}
                    />
                    <div className={`${classes.content} ${classes.style2}`}>
                        <div>
                            <div className={classes.icon}>
                                <img
                                    src="//cdn.shopify.com/s/files/1/0169/4053/1812/files/coffeeicon--2_small.png?v=1551165144"
                                    alt=""
                                    className="wow slideInDown d-none d-md-block"
                                    data-wow-delay="0.25s"
                                />
                            </div>
                            <div className={classes.text}>
                                <p className="wow slideInDown">
                                    Điểm đến lý tưởng <br />
                                    để
                                    <br />{" "}
                                    <strong
                                        className="wow bounceIn"
                                        data-wow-delay="1s"
                                    >
                                        hội họp
                                    </strong>
                                </p>
                                <div>Ăn, uống và hưởng thụ!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </section>
    );
}

export default compose(withStyles(style))(MainSlider);
