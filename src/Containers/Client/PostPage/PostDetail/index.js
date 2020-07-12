import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import * as actions from "../../../../Actions";
import ClientSidebar from "../../../../Components/Client/ClientSidebar";
import style from "./style";
function PostDetail(props) {
    const { classes, article } = props;
    useEffect(() => {
        props.getArticleInfo(props.match.params.id);
        window.scrollTo(0, 0);
    }, [props.history.location.pathname]);
    if (article) {
        document.title = article.title + " - Cà phê Ngọc Khánh";
        return (
            <div className={classes.wrapper}>
                <div className={clsx(classes.breadcrumb)}>
                    <h1>{article.title}</h1>
                    <Breadcrumbs aria-label="breadcrumb" className="mb-2">
                        <Link color="inherit" to="/">
                            Trang chủ
                        </Link>
                        <Typography color="textPrimary">Bài viết</Typography>
                        <Typography>{article.title}</Typography>
                    </Breadcrumbs>
                    {sessionStorage.userId && (
                        <Link to={`/admin/articles/edit/${article.id}`}>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                className="ml-3"
                            >
                                <i className="fas fa-edit pr-2"></i> Chỉnh sửa
                            </Button>
                        </Link>
                    )}
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
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: article.content,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return "";
}

const mapStateToProps = (state) => {
    return {
        article: state.articles.articleInfo,
        productList: state.products.products,
        productCategory: state.Category.productCategory,
        user: state.uiSetting.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getArticleInfo: (id) => {
            dispatch(actions.getArticleInfoReQuest(id));
        },
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(PostDetail);
