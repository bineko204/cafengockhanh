import { Button, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import renderCheckbox from "../../../../Commons/formHelper/renderCheckbox";
import renderSelectField from "../../../../Commons/formHelper/renderSelectField";
import renderTextField from "../../../../Commons/formHelper/renderTextField";
import * as actions from "./../../../../Actions";
import validate from "./../../../../Commons/formHelper/validate";
import style from "./style";
function CategoryForm(props) {
    const {
        handleSubmit,
        invalid,
        submitting,
        classes,
        listCategory,
        redirect,
    } = props;
    useEffect(() => {
        document.title = props.title;
        if (props.listCategory) {
            props.fetchListCategory(props.table);
        }
        if (props.match.params.id) {
            let id = props.match.params.id;
            props.getCategoryInfo(props.table, id);
        }
    }, []);
    const listParentCategory = (listCategory) => {
        var xhtml = null;
        xhtml = listCategory.map((Category, index) => {
            if (props.match.params.id !== Category.id)
                return (
                    <option key={index} value={Category.id}>
                        {Category.title}
                    </option>
                );
        });
        return xhtml;
    };

    const onSubmit = (data) => {
        if (!props.CategoryInfo) {
            props.addCategory(props.table, data);
        } else {
            props.updateCategory(props.table, data);
        }
    };
    // console.log(props.match);
    // console.log(props.productCategoryInfo);
    return (
        <Paper className="p-3">
            <h3>{props.title}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    name="title"
                    component={renderTextField}
                    label="Tên danh mục"
                    fullWidth
                />
                <Field
                    className={classes.selectField}
                    name="parent_id"
                    component={renderSelectField}
                    label="Danh mục cha"
                    value={0}
                >
                    <option value={0}>Là danh mục cha</option>
                    {listParentCategory(listCategory)}
                </Field>
                <Field
                    name="status"
                    component={renderCheckbox}
                    label="Hiển thị"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className="mr-3"
                    type="submit"
                    disabled={invalid || submitting}
                >
                    Lưu lại
                </Button>
                    <Button variant="contained" onClick={() => props.history.goBack() }>Hủy bỏ</Button>
            </form>
            {redirect ? <Redirect to={`/${redirect}`} /> : ""}
        </Paper>
    );
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.Category.listCategory,
        redirect: state.uiSetting.redirect,
        initialValues: state.Category.CategoryInfo,
        CategoryInfo: state.Category.CategoryInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchListCategory: (table) => {
            dispatch(actions.fetchListCategoryReQuest(table));
        },
        addCategory: (table, body) => {
            dispatch(actions.addCategoryReQuest(table, body));
        },
        getCategoryInfo: (table, id) => {
            dispatch(actions.fetchCategoryInfoReQuest(table, id));
        },
        updateCategory: (table, body) => {
            dispatch(actions.updateCategoryReQuest(table, body));
        },
    };
};

const withReduxForm = reduxForm({
    form: "categoryForm",
    validate,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style),
    withReduxForm
)(CategoryForm);
