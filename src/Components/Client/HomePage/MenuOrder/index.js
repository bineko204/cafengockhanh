import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
import style from "./style";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../../../Constants";
function moneyFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function MenuOrder(props) {
    const { classes, products, productCate } = props;

    return (
        <section id="MenuOrder" className={classes.menuOrder}>
            <div className="container">
                <div className="text-center">
                    <h3
                        className={clsx(
                            " pb-4 ",
                            window.innerWidth >= 960 ? " wow slideInDown" : ""
                        )}
                    >
                        Khám phá Menu
                    </h3>
                </div>
                <div className={clsx(classes.listMenu, "row no-padding")}>
                    {productCate.length &&
                        productCate.map(
                            (cate) =>
                                +cate.id !== 1 &&
                                cate.status && (
                                    <div
                                        className={clsx(
                                            "col-md-4 px-md-4 py-4 ",
                                            window.innerWidth >= 960
                                                ? "wow slideInUp"
                                                : ""
                                        )}
                                        key={cate.id}
                                    >
                                        <h4 className={clsx(classes.cateName)}>
                                            {cate.title}
                                        </h4>
                                        {products.length &&
                                            products.map((product) => {
                                                if (
                                                    product.category_id ===
                                                        cate.id &&
                                                    +product.status
                                                ) {
                                                    return (
                                                        <Link
                                                            to={`/product/${product.id}/${product.slug}.html`}
                                                            key={product.id}
                                                            className={clsx(
                                                                classes.menuItem
                                                            )}
                                                        >
                                                            <span className="title">
                                                                {product.title}
                                                            </span>
                                                            <span className="price">
                                                                {moneyFormat(
                                                                    +product.price
                                                                )}{" "}
                                                                đ
                                                            </span>
                                                        </Link>
                                                    );
                                                }
                                            })}
                                    </div>
                                )
                        )}
                </div>
            </div>
        </section>
    );
}

export default withStyles(style)(MenuOrder);
