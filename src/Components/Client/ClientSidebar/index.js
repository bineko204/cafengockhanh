import { withStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { compose } from "redux";
import style from "./style";
import clsx from "clsx";
import { Link } from "react-router-dom";
function moneyFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function ClientSidebar(props) {
    const { classes, productList, productCategory } = props;
    return (
        <div className={clsx(classes.wrSidebar)}>
            <h3>Menu</h3>
            <ul>
                {productCategory.length &&
                    productCategory.map((cate) => {
                        if (+cate.id !== 1 && cate.status)
                            return (
                                <li key={cate.id}>
                                    <span>{cate.title}</span>
                                    <ul>
                                        {productList.length && productList.map((product) => {
                                            if (product.category_id === cate.id && +product.status) {
                                                return (
                                                    <Link to={`/product/${product.id}/${product.slug}.html`} key={product.id}>
                                                        <li className="d-flex justify-content-between">
                                                            <span>{product.title}</span>
                                                            <span>{moneyFormat(product.price)}{" "}đ</span>
                                                        </li>
                                                    </Link>
                                                );
                                            }
                                        })}
                                    </ul>
                                </li>
                            );
                    })}
            </ul>
        </div>
    );
}

export default compose(withStyles(style))(ClientSidebar);
