import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Button, InputAdornment, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import renderCheckbox from "../../../../Commons/formHelper/renderCheckbox";
import renderSelectField from "../../../../Commons/formHelper/renderSelectField";
import renderTextField from "../../../../Commons/formHelper/renderTextField";
import ListSelectCategory from "../../../../Components/Admin/ListSelectCategory";
import Media from "../../Media";
import * as actions from "./../../../../Actions";
import validate from "./../../../../Commons/formHelper/validate";
import { SERVER_URL } from "./../../../../Constants";
import style from "./style";
function ProductForm(props) {
    const [imageInfo, setImageInfo] = useState();
    const getImageInfo = (data) => {
        setImageInfo(data);
    };
    const onShowModal = () => {
        props.showModal(true);
        props.changeModalContent(
            <Media type="modal" getImageInfo={(data) => getImageInfo(data)} />
        );
        props.changeModalTitle("Thư viện ảnh");
    };

    const handleSubmitData = (data) => {
        let formData = new FormData();
        data.date_created = Date.now();
        formData.append("title", data.title);
        formData.append("category_id", data.category_id);
        formData.append(
            "description",
            data.description ? data.description : ""
        );
        formData.append("content", data.content ? data.content : "");
        formData.append("price", data.price);
        formData.append("discount", data.discount);
        if (props.initialValues) {
            formData.append(
                "image_id",
                imageInfo ? imageInfo.id : props.initialValues.image_id
            );
        } else {
            formData.append("image_id", imageInfo ? imageInfo.id : "1");
        }
        if (!props.initialValues) {
            formData.append("date_created", data.date_created / 1000);
            if (!data.status || data.status === false) {
                formData.append("status", "0");
            } else if (data.status === true) {
                formData.append("status", "1");
            }
            props.addProduct(formData);
        } else if (props.initialValues && props.initialValues.id) {
            formData.append("status", data.status);
            props.updateProduct(props.match.params.id, formData);
        }
        // console.log(data)
    };

    const { classes, handleSubmit, redirect } = props;
    // console.log(this.props);

    const renderEditor = ({ input }) => {
        return (
            <CKEditor
                data={input.value}
                editor={ClassicEditor}
                onChange={(event, editor) => {
                    return input.onChange(editor.getData());
                }}
                config={{
                    ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command
                        // You have to change this address to your server that has the ckfinder php connector
                        uploadUrl: `${SERVER_URL}/server/index.php/ckfinder/`,
                    },
                }}
            />
        );
    };

    useEffect(() => {
        document.title = props.title;
        props.fetchProductCategory("product_category");
        if (props.match.params.id) {
            let id = props.match.params.id;
            props.getProductInfo(id);
        }
        if (props.redirect) {
            props.history.goBack();
        }
    }, []);
    useEffect(() => {
        if (props.redirect) {
            props.history.goBack();
        }
    });
    // console.log(props.initialValues);
    if (props.initialValues === "404") return <h2>Không tìm thấy sản phẩm!</h2>;
    else
        return (
            <form className="row" onSubmit={handleSubmit(handleSubmitData)}>
                <h4 className={clsx("col-md-6", classes.title)}>
                    {props.title}
                </h4>
                <div className="col-md-9">
                    <Paper className="px-3 pb-4">
                        <label className="font-weight-bold my-3">
                            Tên sản phẩm:
                        </label>
                        <Field
                            name="title"
                            component={renderTextField}
                            label="Điền tên sản phẩm..."
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                        <label className="font-weight-bold my-3">
                            Danh mục:
                        </label>
                        <br />
                        <Field
                            variant="outlined"
                            name="category_id"
                            component={renderSelectField}
                            className={classes.selectField}
                            value={1}
                        >
                            {props.listCategory.map((category, index) => (
                                <ListSelectCategory
                                    key={index}
                                    category={category}
                                />
                                // <option value={category.id}>{category.title}</option>
                            ))}
                        </Field>
                        <br />
                        <label className="font-weight-bold my-3">Mô tả:</label>
                        <Field
                            variant="outlined"
                            name="description"
                            component={renderTextField}
                            label="Mô tả ngắn"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <label className="font-weight-bold my-3">
                            Nội dung:
                        </label>
                        <Field name="content" component={renderEditor} />
                    </Paper>
                </div>
                <div className="col-md-3">
                    <Paper>
                        <div className="card mb-3">
                            <div className="card-header font-weight-bold">
                                Ảnh đại diện
                            </div>
                            <div className="card-body text-center">
                                <Button
                                    onClick={() => onShowModal()}
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                >
                                    Chọn ảnh
                                </Button>
                                <div className="wr-preview-img mt-3">
                                    <img
                                        id="img"
                                        src={
                                            imageInfo
                                                ? `${SERVER_URL}/${imageInfo.thumb}`
                                                : props.initialValues &&
                                                  `${SERVER_URL}/${props.initialValues.thumb}`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Paper>
                    <Paper>
                        <div className="card mb-3">
                            <div className="card-header font-weight-bold">
                                Giá sản phẩm
                            </div>
                            <div className="card-body text-center">
                                <Field
                                    name="price"
                                    component={renderTextField}
                                    type="number"
                                    label="Giá sản phẩm"
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                className="pr-1"
                                            >
                                                vnđ
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Field
                                    name="discount"
                                    component={renderTextField}
                                    type="number"
                                    label="Giá khuyến mại"
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                className="pr-1"
                                            >
                                                vnđ
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                    </Paper>
                    <Paper className="d-flex justify-content-around py-3">
                        <Field
                            name="status"
                            component={renderCheckbox}
                            label="Hiển thị"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="text-right"
                        >
                            Lưu lại
                        </Button>
                    </Paper>
                </div>
                {/* {redirect ? <Redirect to={redirect} /> : ""} */}
            </form>
        );
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.Category.listCategory,
        redirect: state.uiSetting.redirect,
        initialValues: state.products.productInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (body) => {
            dispatch(actions.addProductReQuest(body));
        },
        fetchProductCategory: (table) => {
            dispatch(actions.fetchListCategoryReQuest(table));
        },
        getProductInfo: (id) => {
            dispatch(actions.getProductInfoReQuest(id));
        },
        updateProduct: (id, body) => {
            dispatch(actions.updateProductReQuest(id, body));
        },
        showModal: () => {
            dispatch(actions.showModal());
        },
        changeModalContent: (component) => {
            dispatch(actions.changeModalContent(component));
        },
        changeModalTitle: (title) => {
            dispatch(actions.changeModalTitle(title));
        },
    };
};

const withReduxForm = reduxForm({
    // a unique name for the form
    form: "productForm",
    validate,
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReduxForm,
    withStyles(style)
)(ProductForm);
