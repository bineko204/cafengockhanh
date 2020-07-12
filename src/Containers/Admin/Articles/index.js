import { Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import * as actions from "../../../Actions";
import EnhancedTableHead from "../../../Components/Admin/Products/EnhancedTableHead";
import EnhancedTableToolbar from "../../../Components/Admin/Products/EnhancedTableToolbar";
import * as Types from "./../../../Constants";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));
function Articles(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("date_created");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { rows } = props;
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleDelete = () => {
        let formData = new FormData();
        selected.forEach((element) => {
            formData.append(element, element);
        });
        props.deleteArticle(formData);
        setSelected([]);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const showStatus = (status) => {
        let xhtml = null;
        xhtml =
            status === "1" ? (
                <span className="badge badge-pill badge-success p-2">
                    Hiển thị
                </span>
            ) : (
                <span className="badge badge-pill badge-danger p-2">Ẩn</span>
            );
        return xhtml;
    };

    const showDate = (data) => {
        let date = new Date(data * 1000);
        let text = "";
        text += date.getDate() + " - ";
        text += date.getMonth() + 1 + " - ";
        text += date.getFullYear();
        return text;
    };

    const showImage = (link) => {
        let url = Types.SERVER_URL;
        return <img src={`${url}/${link}`} width="60" height="60" alt="img" />;
    };

    const showCategoryName = (id) => {
        let category = null;
        props.listCate.map((cate) => {
            if (id === cate.id) {
                category = cate.title;
            } else if (cate.children) {
                cate.children.map((children) => {
                    if (children.id === id) {
                        category = children.title;
                    }
                });
            }
        });
        return category;
    };

    useEffect(() => {
        document.title = props.title;
        props.fetchListArticle();
        props.fetchCategory("article_category");
    }, []);
    return (
        <div className={classes.root}>
            <Link to={`${props.match.url}/add`}>
                <Button variant="contained" color="primary" className="mb-3">
                    <i className="fas fa-plus pr-3"></i>
                    <span> Thêm mới bài viết</span>
                </Button>
            </Link>

            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onDelete={() => handleDelete()}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.title}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                onClick={(event) =>
                                                    handleClick(event, row.id)
                                                }
                                            >
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                onClick={(event) =>
                                                    handleClick(event, row.id)
                                                }
                                            >
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="center" className="d-none d-md-table-cell">
                                                {showDate(row.date_created)}
                                            </TableCell>
                                            <TableCell align="center" className="d-none d-md-table-cell">
                                                {showImage(row.thumb)}
                                            </TableCell>
                                            <TableCell align="center" className="d-none d-md-table-cell">
                                                {showCategoryName(
                                                    row.category_id
                                                )}
                                            </TableCell>
                                            <TableCell align="center" className="d-none d-md-table-cell">
                                                {showStatus(row.status)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link
                                                    to={`${props.match.url}/edit/${row.id}`}
                                                >
                                                    <Fab
                                                        color="primary"
                                                        aria-label="edit"
                                                        size="small"
                                                    >
                                                        <EditIcon />
                                                    </Fab>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        rows: state.articles.articles,
        listCate: state.Category.listCategory,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchListArticle: () => {
            dispatch(actions.fetchListArticleReQuest());
        },
        fetchCategory: (table) => {
            dispatch(actions.fetchListCategoryReQuest(table));
        },
        deleteArticle: (body) => {
            dispatch(actions.deleteArticleReQuest(body));
        },
    };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(Articles);
