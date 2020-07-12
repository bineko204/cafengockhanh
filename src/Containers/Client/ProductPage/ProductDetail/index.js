import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import style from "./style";
import clsx from "clsx";
import { Breadcrumbs, Typography, Fab, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ClientSidebar from "../../../../Components/Client/ClientSidebar";
import * as actions from "./../../../../Actions";
import { SERVER_URL } from "../../../../Constants";

function moneyFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ProductDetail(props) {
    const { classes, product } = props;
    useEffect(() => {
        props.getProductInfo(props.match.params.id);
        window.scrollTo(0, 0);
    }, [props.history.location.pathname]);
    if (product) {
        document.title = product.title + " - Cà phê Ngọc Khánh";
        return (
            <div className={classes.wrapper}>
                <div className={clsx(classes.breadcrumb)}>
                    <div className="container">
                        <h1>{product.title}</h1>
                        <Breadcrumbs aria-label="breadcrumb" className="mb-2">
                            <Link color="inherit" to="/">
                                Trang chủ
                            </Link>
                            <Typography color="textPrimary">
                                Thực đơn
                            </Typography>
                            <Typography>{product.title}</Typography>
                        </Breadcrumbs>
                        {sessionStorage.userId && (
                            <Link to={`/admin/products/edit/${product.id}`}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    className="ml-3"
                                >
                                    <i className="fas fa-edit pr-2"></i> Chỉnh
                                    sửa
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="container py-5 px-0">
                    <div className="row no-padding">
                        <div className={clsx("col-md-3 px-3", classes.left)}>
                            <ClientSidebar
                                productList={props.productList}
                                productCategory={props.productCategory}
                            />
                        </div>
                        <div className={clsx("col-md-9 px-3", classes.right)}>
                            <div className="row no-padding">
                                <div
                                    className={clsx(
                                        "col-md-5 mb-3",
                                        classes.wrImage
                                    )}
                                >
                                    <img
                                        src={`${SERVER_URL}/${product.image}`}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className={clsx(
                                        "col-md-7 px-md-5",
                                        classes.wrDesc
                                    )}
                                >
                                    <h3>{product.title}</h3>
                                    <p className="price">
                                        {moneyFormat(product.price)} đ
                                    </p>
                                    <div className="stars">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <div className="description">
                                        {product.description}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wrDetail}>
                                <h4 className="title">Chi tiết sản phẩm</h4>
                                <div id="product-content" className="content">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: product.content,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return "";
}

const mapStateToProps = (state) => {
    return {
        product: state.products.productInfo,
        productList: state.products.products,
        productCategory: state.Category.productCategory,
        user: state.uiSetting.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProductInfo: (id) => {
            dispatch(actions.getProductInfoReQuest(id));
        },
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(ProductDetail);
