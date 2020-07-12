import React from "react";
import {
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
    TableSortLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";
const headCells = [
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "Tên",
    },
    {
        id: "date_created",
        numeric: false,
        disablePadding: false,
        label: "Ngày đăng",
    },
    { id: "image", numeric: true, disablePadding: false, label: "Ảnh" },
    {
        id: "category_id",
        numeric: false,
        disablePadding: false,
        label: "Danh mục",
    },
    { id: "status", numeric: true, disablePadding: false, label: "Trạng thái" },
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align={headCell.id === "title" ? "left" : "center"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        className={headCell.id === "title" ? "" : "d-none d-md-table-cell"}
                    >
                        <TableSortLabel
                            className="font-weight-bold"
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="center">
                    <span>Hành động</span>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
