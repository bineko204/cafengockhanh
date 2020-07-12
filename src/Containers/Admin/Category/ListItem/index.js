import { Fab, TableCell, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "./../../../../Actions";
import { Link } from "react-router-dom";
function ListItem(props) {
    let { item } = props;
    const getDate = () => {
        let date = new Date(item.date_created * 1000);
        let text = "";
        text += date.getDate() + " - ";
        text += date.getMonth() + 1 + " - ";
        text += date.getFullYear();
        return text;
    };
    const status =
        item.status === true ? (
            <span className="badge badge-pill badge-success p-2">
                Kích hoạt
            </span>
        ) : (
            <span className="badge badge-pill badge-danger p-2">Ẩn</span>
        );
    const renderChildCate = () => {
        let xhtml = null;
        // console.log(props);
        if (item.children.length > 0) {
            xhtml = item.children.map((children, index) => {
                const childStatus =
                    children.status === true ? (
                        <span className="badge badge-pill badge-success p-2">
                            Kích hoạt
                        </span>
                    ) : (
                        <span className="badge badge-pill badge-danger p-2">
                            Ẩn
                        </span>
                    );
                return (
                    <TableRow hover className="" key={index}>
                        <TableCell className="d-none d-md-table-cell">- - - - {children.id}</TableCell>
                        <TableCell align="center">{children.title}</TableCell>
                        <TableCell align="center" className="d-none d-md-table-cell">{getDate()}</TableCell>
                        <TableCell align="center">
                            {children.parent_name}
                        </TableCell>
                        <TableCell align="center" className="d-none d-md-table-cell">{children.slug}</TableCell>
                        <TableCell align="center" className="d-none d-md-table-cell">{childStatus}</TableCell>
                        <TableCell align="center">
                            <Link to={`${props.match.url}/edit/${children.id}`}>
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    size="small"
                                    className="mr-2"
                                >
                                    <EditIcon />
                                </Fab>
                            </Link>
                            <Fab
                                color="primary"
                                aria-label="delete"
                                size="small"
                                onClick={() => handleDelete(props.table, children.id)}
                            >
                                <DeleteIcon />
                            </Fab>
                        </TableCell>
                    </TableRow>
                );
            });
        }
        return xhtml;
    };

    const handleDelete = (table, id) => {
        props.handleDelete(table, id);
    };
    return (
        <Fragment>
            <TableRow hover className="bg-light">
                <TableCell className="d-none d-md-table-cell">{item.id}</TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center" className="d-none d-md-table-cell">{getDate()}</TableCell>
                <TableCell align="center">{item.parent_name}</TableCell>
                <TableCell align="center" className="d-none d-md-table-cell">{item.slug}</TableCell>
                <TableCell align="center" className="d-none d-md-table-cell">{status}</TableCell>
                <TableCell align="center">
                    {item.id !== "1" && (
                        <div>
                            <Link to={`${props.match.url}/edit/${item.id}`}>
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    size="small"
                                    className="mr-2"
                                >
                                    <EditIcon />
                                </Fab>
                            </Link>
                            <Fab
                                color="primary"
                                aria-label="delete"
                                size="small"
                                onClick={() => handleDelete(props.table, item.id)}
                            >
                                <DeleteIcon />
                            </Fab>
                        </div>
                    )}
                </TableCell>
            </TableRow>
            {renderChildCate()}
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.productCategory,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleDelete: (table, id) => {
            dispatch(actions.deleteCategoryReQuest(table, id));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
