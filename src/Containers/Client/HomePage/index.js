import { withStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Gallery from '../../../Components/Client/HomePage/Gallery';
import Introduce from '../../../Components/Client/HomePage/Introduce';
import Karaoke from '../../../Components/Client/HomePage/Karaoke';
import MenuOrder from '../../../Components/Client/HomePage/MenuOrder';
import OpenTime from '../../../Components/Client/HomePage/OpenTime';
import * as actions from './../../../Actions';
import MainSlider from './../../../Components/Client/Slider';
import style from './style';
import LazyLoad from 'react-lazyload';
function HomPage(props) {
    const { classes } = props;
    useEffect(() => {
        props.getListImage();
        document.title = 'Cà phê Ngọc Khánh - Hát cho nhau nghe';
    }, []);
    return (
        <div className={classes.siteWrapper}>
            <LazyLoad height={200} offset={100} once>
                <MainSlider />
            </LazyLoad>
            <LazyLoad height={200} offset={100} once>
                <Introduce listLayout={props.listLayout} />
            </LazyLoad>
            <LazyLoad height={200} offset={100} once>
                <Karaoke />
            </LazyLoad>
            <LazyLoad height={200} offset={100} once>
                <MenuOrder
                    productCate={props.productCate}
                    products={props.products}
                />
            </LazyLoad>
            <LazyLoad height={200} offset={100} once>
                <OpenTime />
            </LazyLoad>
            <LazyLoad height={200} offset={100} once>
                <Gallery gallery={props.gallery} />
            </LazyLoad>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gallery: state.media.listImage,
        productCate: state.Category.productCategory,
        products: state.products.products,
        listLayout: state.uiSetting.layout,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getListImage: () => {
            dispatch(actions.getListImageReQuest());
        },
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(HomPage);
