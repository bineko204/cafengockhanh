import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import * as actions from "./../../../Actions";
import ListItem from "./ListItem";
import style from "./style";

function Category(props) {
    let { classes } = props;
    document.title = props.title;
    useEffect(() => {
        props.fetchListCategory(props.table);
        props.removeCategoryInfo();
    }, []);
    const listCategory = props.listCategory.listCategory;
    return (
        <Fragment>
            <Link to={`${props.match.url}/add`}>
                <Button variant="contained" color="primary" className="mb-3">
                    <i className="fas fa-plus pr-3"></i>
                    <span> Thêm mới danh mục</span>
                </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="a dense table">
                    <TableHead className={classes.bold}>
                        <TableRow>
                            <TableCell
                                className={`${classes.bold} d-none d-md-table-cell`}
                            >
                                id
                            </TableCell>
                            <TableCell className={classes.bold} align="center">
                                Tên danh mục
                            </TableCell>
                            <TableCell
                                className={`${classes.bold} d-none d-md-table-cell`}
                                align="center"
                            >
                                Ngày khởi tạo
                            </TableCell>
                            <TableCell
                                className={`${classes.bold}`}
                                align="center"
                            >
                                Danh mục cha
                            </TableCell>
                            <TableCell
                                className={`${classes.bold} d-none d-md-table-cell`}
                                align="center"
                            >
                                slug
                            </TableCell>
                            <TableCell
                                className={`${classes.bold} d-none d-md-table-cell`}
                                align="center"
                            >
                                Trạng thái
                            </TableCell>
                            <TableCell className={classes.bold} align="center">
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listCategory.map((i) => (
                            <ListItem item={i} key={i.id} {...props} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        listCategory: state.Category,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchListCategory: (table) => {
            dispatch(actions.fetchListCategoryReQuest(table));
        },
        removeCategoryInfo: () => {
            dispatch(actions.removeCategoryInfo());
        },
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(Category);
