import { withStyles } from "@material-ui/styles";
import "lightgallery.js/dist/css/lightgallery.css";
import React from "react";
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import style from "./style";
import clsx from "clsx";
import Slider from "react-slick";
import * as Types from "./../../../../Constants";
function Gallery(props) {
    const classes = props.classes;
    let number = Math.floor(window.innerWidth / 200);
    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: true,
        speed: 500,
        slidesToShow: number,
        swipe: true,
        autoplaySpeed: 3000,
    };
    const listImage = () => {
        let xhtml = null;
        const url = Types.SERVER_URL;
        xhtml = props.gallery.map((image) => {
            return (
                <div className={classes.galleryItem} key={image.id}>
                    <LightgalleryItem group="any" src={`${url}/${image.image}`}>
                        <a
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <img src={`${url}/${image.thumb}`} />
                        </a>
                    </LightgalleryItem>
                </div>
            );
        });
        return xhtml;
    };
    return (
        <section id="Gallery" className={classes.Gallery}>
            <h3
                className={clsx(
                    " ",
                    window.innerWidth >= 960 ? "wow slideInDown" : ""
                )}
            >
                Thư viện ảnh
            </h3>
            <LightgalleryProvider
                lightgallerySettings={
                    {
                        // settings: https://sachinchoolur.github.io/lightgallery.js/docs/api.html
                    }
                }
                galleryClassName="my_custom_classname"
            >
                <Slider {...settings}>{listImage()}</Slider>
            </LightgalleryProvider>
        </section>
    );
}

export default withStyles(style)(Gallery);
