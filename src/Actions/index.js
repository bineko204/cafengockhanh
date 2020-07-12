import * as CategoryApi from "./../Apis/productCategory";
import * as productApi from "./../Apis/products";
import * as articleApi from "./../Apis/articles";
import * as Types from "./../Constants";
import { toast } from "react-toastify";
import * as mediaApi from "./../Apis/media";
import * as karaokeApi from "./../Apis/karaoke";
import * as usersApi from "./../Apis/users";
import * as configApi from "./../Apis/config";
import * as apiKeyApi from "../Apis/apiKey";
export const fetchListProductReQuest = () => {
    return (dispatch) => {
        dispatch(fetchListProduct());
        productApi
            .getList()
            .then((data) => {
                // console.log(data);
                dispatch(fetchListProductSuccess(data.data));
            })
            .catch((err) => {
                // console.log(err)
                dispatch(fetchListProductFailed(err));
            });
    };
};
export const fetchListProduct = () => {
    return {
        type: Types.FETCH_PRODUCTS,
    };
};
export const fetchListProductSuccess = (products) => {
    return {
        type: Types.FETCH_PRODUCTS_SUCCESS,
        payload: {
            products,
        },
    };
};
export const fetchListProductFailed = (error) => {
    return {
        type: Types.FETCH_PRODUCTS_FAILED,
        error: error,
    };
};

export const removeProductInfo = () => {
    return {
        type: Types.REMOVE_PRODUCT_INFO,
    };
};
// ==================================== Láy list category
export const fetchListCategoryReQuest = (table) => {
    return (dispatch) => {
        dispatch(fetchListCategory());
        CategoryApi.getList(table)
            .then((data) => {
                dispatch(
                    fetchListCategorySuccess(table, Object.values(data.data))
                );
            })
            .catch((err) => {
                dispatch(fetchListCategoryFailed(err));
            });
    };
};
export const fetchListCategory = () => {
    return {
        type: Types.FETCH_LIST_CATEROGY,
    };
};
export const fetchListCategorySuccess = (table, listCategory) => {
    return {
        type: Types.FETCH_LIST_CATEROGY_SUCCESS,
        payload: {
            listCategory,
            table,
        },
    };
};
export const fetchListCategoryFailed = (error) => {
    return {
        type: Types.FETCH_LIST_CATEROGY_FAILED,
        error: error,
    };
};

export const removeCategoryInfo = () => {
    return {
        type: Types.REMOVE_CATEGORY_INFO,
    };
};
// =================================== Thêm mới category
export const addCategoryReQuest = (table, body) => {
    return (dispatch) => {
        dispatch(addCategory());
        CategoryApi.submitForm(table, body)
            .then((data) => {
                dispatch(addCategorySuccess(data.data));
                toast.success("Thêm mới danh mục thành công");
            })
            .catch((err) => {
                console.log(err);
                dispatch(addProductCategoryFailed(err));
            });
    };
};
export const addCategory = () => {
    return {
        type: Types.ADD_CATEGORY,
    };
};
export const addCategorySuccess = (redirect) => {
    return {
        type: Types.ADD_CATEGORY_SUCCESS,
        payload: {
            redirect,
        },
    };
};
export const addProductCategoryFailed = (error) => {
    return {
        type: Types.ADD_CATEGORY_FAILED,
        error: error,
    };
};
// ============================================== Lấy thông tin 1 category theo id
export const fetchCategoryInfoReQuest = (table, id) => {
    return (dispatch) => {
        dispatch(fetchCategoryInfo());
        CategoryApi.getCategoryInfo(table, id)
            .then((data) => {
                dispatch(fetchCategoryInfoSuccess(data.data));
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
                dispatch(fetchCategoryInfoFailed(err));
            });
    };
};
export const fetchCategoryInfo = () => {
    return {
        type: Types.FETCH_CATEGORY_INFO,
    };
};
export const fetchCategoryInfoSuccess = (Category) => {
    return {
        type: Types.FETCH_CATEGORY_INFO_SUCCESS,
        payload: {
            Category,
        },
    };
};
export const fetchCategoryInfoFailed = (error) => {
    return {
        type: Types.FETCH_CATEGORY_INFO_FAILED,
        error: error,
    };
};

// ========================================== UPdate Product Category
export const updateCategoryReQuest = (table, body) => {
    return (dispatch) => {
        dispatch(updateCategory());
        CategoryApi.updateCategory(table, body.id, body)
            .then((data) => {
                dispatch(updateCategorySuccess(data.data));
                toast.success("Sửa danh mục thành công");
            })
            .catch((err) => {
                console.log(err);
                dispatch(updateCategoryFailed(err));
            });
    };
};
export const updateCategory = () => {
    return {
        type: Types.UPDATE_CATEGORY,
    };
};
export const updateCategorySuccess = (redirect) => {
    return {
        type: Types.UPDATE_CATEGORY_SUCCESS,
        payload: {
            redirect,
        },
    };
};
export const updateCategoryFailed = (error) => {
    return {
        type: Types.UPDATE_CATEGORY_FAILED,
        error: error,
    };
};
// ================================================ Xóa category theo ID
export const deleteCategoryReQuest = (table, id) => {
    return (dispatch) => {
        dispatch(deleteCategory());
        CategoryApi.deleteCategory(table, id)
            .then(() => {
                dispatch(deleteCategorySuccess());
                // console.log(data.data);
                toast.success("Xóa danh mục thành công");
                dispatch(fetchListCategoryReQuest(table));
            })
            .catch((err) => {
                console.log(err);
                dispatch(deleteCategoryFailed(err));
            });
    };
};
export const deleteCategory = () => {
    return {
        type: Types.DELETE_CATEGORY,
    };
};
export const deleteCategorySuccess = () => {
    return {
        type: Types.DELETE_CATEGORY_SUCCESS,
    };
};
export const deleteCategoryFailed = (error) => {
    return {
        type: Types.DELETE_CATEGORY_FAILED,
        error: error,
    };
};

export const addProductReQuest = (body) => {
    return (dispatch) => {
        dispatch(addProduct());
        productApi
            .submitForm(body)
            .then((data) => {
                // console.log(data.data);
                dispatch(addProductSuccess(data.data));
                toast.success("Thêm mới sản phẩm thành công");
            })
            .catch((err) => {
                dispatch(addProductFailed(err));
                // console.log(err);
            });
    };
};

export const addProduct = () => {
    return {
        type: Types.ADD_PRODUCT,
    };
};
export const addProductSuccess = (product) => {
    return {
        type: Types.ADD_PRODUCT_SUCCESS,
        payload: {
            product,
        },
    };
};
export const addProductFailed = (error) => {
    return {
        type: Types.ADD_PRODUCT_FAILED,
        payload: {
            error,
        },
    };
};

export const getProductInfoReQuest = (id) => {
    return (dispatch) => {
        // dispatch(addProduct());
        productApi
            .getProductInfo(id)
            .then((data) => {
                if (data.status === 200) {
                    dispatch(getProductInfoSuccess(data.data));
                }
            })
            .catch((err) => {
                dispatch(getProductInfoFailed());
                console.log(err);
            });
    };
};

export const getProductInfoSuccess = (product) => {
    return {
        type: Types.GET_PRODUCT_INFO_SUCCESS,
        payload: {
            product,
        },
    };
};
export const getProductInfoFailed = () => {
    return {
        type: Types.GET_PRODUCT_INFO_FAILED,
    };
};
export const updateProductReQuest = (id, body) => {
    return (dispatch) => {
        productApi
            .updateProduct(id, body)
            .then((data) => {
                // console.log(data);
                dispatch(updateProductSuccess());
                toast.success("Chỉnh sửa sản phẩm thành công");
            })
            .catch((err) => {
                toast.error(err);
            });
    };
};

export const updateProductSuccess = () => {
    return {
        type: Types.UPDATE_PRODUCT_SUCCESS,
    };
};

export const deleteProductReQuest = (listId) => {
    return (dispatch) => {
        productApi
            .deleteProduct(listId)
            .then((data) => {
                toast.success("xóa thành công " + data.data + " Sp");
                dispatch(fetchListProductReQuest());
            })
            .catch((err) => {
                toast.error(err);
            });
    };
};

// =================
export const fetchListArticleReQuest = () => {
    return (dispatch) => {
        dispatch(fetchListArticle());
        articleApi
            .getList()
            .then((data) => {
                dispatch(fetchListArticleSuccess(data.data));
            })
            .catch((err) => {
                // console.log(err)
                dispatch(fetchListArticleFailed(err));
            });
    };
};
export const fetchListArticle = () => {
    return {
        type: Types.FETCH_LIST_ARTICLE,
    };
};
export const fetchListArticleSuccess = (articles) => {
    return {
        type: Types.FETCH_LIST_ARTICLE_SUCCESS,
        payload: {
            articles,
        },
    };
};
export const fetchListArticleFailed = (error) => {
    return {
        type: Types.FETCH_LIST_ARTICLE_FAILED,
        error: error,
    };
};

export const addArticleReQuest = (body) => {
    return (dispatch) => {
        dispatch(addArticle());
        articleApi
            .submitForm(body)
            .then((data) => {
                // console.log(data.data);
                dispatch(addArticleSuccess(data.data));
                toast.success("Thêm mới sản phẩm thành công");
            })
            .catch((err) => {
                dispatch(addArticleFailed(err));
                // console.log(err);
            });
    };
};

export const addArticle = () => {
    return {
        type: Types.ADD_ARTICLE,
    };
};
export const addArticleSuccess = (article) => {
    return {
        type: Types.ADD_ARTICLE_SUCCESS,
        payload: {
            article,
        },
    };
};
export const addArticleFailed = (error) => {
    return {
        type: Types.ADD_ARTICLE_FAILED,
        payload: {
            error,
        },
    };
};

export const getArticleInfoReQuest = (id) => {
    return (dispatch) => {
        // dispatch(addProduct());
        articleApi
            .getArticleInfo(id)
            .then((data) => {
                if (data.status === 200) {
                    dispatch(getArticleInfoSuccess(data.data));
                }
            })
            .catch((err) => {
                dispatch(getArticleInfoFailed());
                console.log(err);
            });
    };
};

export const getArticleInfoSuccess = (article) => {
    return {
        type: Types.GET_ARTICLE_INFO_SUCCESS,
        payload: {
            article,
        },
    };
};
export const getArticleInfoFailed = () => {
    return {
        type: Types.GET_ARTICLE_INFO_FAILED,
    };
};

export const updateArticleReQuest = (id, body) => {
    return (dispatch) => {
        articleApi
            .updateArticle(id, body)
            .then((data) => {
                // console.log(data);
                dispatch(updateArticleSuccess());
                toast.success("Chỉnh sửa bài viết thành công");
            })
            .catch((err) => {
                toast.error(err);
            });
    };
};

export const updateArticleSuccess = () => {
    return {
        type: Types.UPDATE_ARTICLE_SUCCESS,
    };
};

export const deleteArticleReQuest = (listId) => {
    return (dispatch) => {
        articleApi
            .deleteArticle(listId)
            .then((data) => {
                toast.success("xóa thành công " + data.data + " bài viết");
                dispatch(fetchListArticleReQuest());
            })
            .catch((err) => {
                toast.error(err);
            });
    };
};

export const showModal = (showModal = true) => {
    return {
        type: Types.SHOW_MODAL,
        payload: {
            showModal,
        },
    };
};

export const changeModalContent = (component) => {
    return {
        type: Types.CHANGE_MODAL_CONTENT,
        payload: {
            component,
        },
    };
};

export const changeModalTitle = (title) => {
    return {
        type: Types.CHANGE_MODAL_TITLE,
        payload: {
            title,
        },
    };
};

export const getListImageReQuest = () => {
    return (dispatch) => {
        mediaApi
            .getList()
            .then((data) => {
                dispatch(getListImageSuccess(data.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getListImageSuccess = (data) => {
    return {
        type: Types.GET_LIST_IMAGE_SUCCESS,
        payload: {
            listImage: data,
        },
    };
};

export const addImageReQuest = (body) => {
    return (dispatch) => {
        mediaApi
            .submitForm(body)
            .then((data) => {
                dispatch(addImageSuccess(data.data));
                toast.success("Thêm ảnh thành công");
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const addImageSuccess = (data) => {
    return {
        type: Types.ADD_IMAGE_SUCCESS,
        payload: {
            image: data,
        },
    };
};

export const deleteImageReQuest = (body) => {
    return (dispatch) => {
        mediaApi
            .deleteImage(body)
            .then((data) => {
                toast.success("xóa ảnh thành công");
                dispatch(getListImageReQuest());
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const login = (body) => {
    return (dispatch) => {
        usersApi
            .login(body)
            .then((data) => {
                if (data.status === 200) {
                    dispatch(loginSuccess(data.data));
                    toast.success("đăng nhập thành công");
                } else {
                    toast.warn("Sai tên đăng nhập hoặc mật khẩu");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const loginSuccess = (data) => {
    return {
        type: Types.CHECK_LOGIN_SUCCESS,
        payload: {
            data,
        },
    };
};

export const getUserInfo = (id) => {
    return (dispatch) => {
        usersApi
            .getUserInfo(id)
            .then((data) => {
                dispatch(getUserInfoSuccess(data.data[0]));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getUserInfoSuccess = (user) => {
    return {
        type: Types.GET_USER_INFO,
        payload: {
            user,
        },
    };
};

export const updateUserInfo = (id, body) => {
    return (dispatch) => {
        usersApi
            .updateUserInfo(id, body)
            .then((data) => {
                dispatch(updateUserInfoSuccess(data.data));
                toast.success("Chỉnh sửa thông tin thành công");
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const updateUserInfoSuccess = (user) => {
    return {
        type: Types.UPDATE_USER_INFO_SUCCESS,
        payload: {
            user,
        },
    };
};

export const logout = () => {
    return {
        type: Types.LOGOUT,
    };
};
export const addKaraokeVideo = (body) => {
    return () => {
        karaokeApi
            .addVideo(body)
            .then((data) => {
                toast.success("thêm bài hát thành công");
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const getListKaraokeVideoReQuest = () => {
    return (dispatch) => {
        karaokeApi
            .getList()
            .then((data) => {
                dispatch(getListKaraokeVideo(data.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getListKaraokeVideo = (data) => {
    return {
        type: Types.GET_LIST_KARAOKE_VIDEO,
        payload: {
            data,
        },
    };
};

export const deleteKaraokeVideo = (id) => {
    return () => {
        karaokeApi
            .deleteVideo(id)
            .then((data) => {
                setTimeout(() => {
                    toast.success("thành công");
                }, 500);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getListConfig = () => {
    return (dispatch) => {
        configApi
            .getListConfig()
            .then((data) => {
                dispatch(getListConfigSuccess(data.data[0]));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getListConfigSuccess = (config) => {
    return {
        type: Types.GET_SITE_CONFIG,
        payload: {
            config,
        },
    };
};

export const changeSiteConfig = (data) => {
    return (dispatch) => {
        configApi
            .changeConfig(data)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(changeSiteConfigSuccess(res.data[0]));
                    toast.success("thay đổi thành công");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const changeSiteConfigSuccess = (config) => {
    return {
        type: Types.CHANGE_SITE_CONFIG,
        payload: {
            config,
        },
    };
};

export const showAdminSidebar = (status) => {
    return {
        type: Types.SHOW_ADMIN_SIDEBAR,
        payload: {
            status,
        },
    };
};

// export const getListLayout = (group = 0) => {
//     return (dispatch) => {
//         layoutApi
//             .getList(group)
//             .then((data) => {
//                 dispatch(getListLayoutSuccess(data.data));
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };
// };

// export const getListLayoutSuccess = (data) => {
//     return {
//         type: Types.GET_LIST_LAYOUT,
//         payload: {
//             data,
//         },
//     };
// };

export const getAPIKEY = () => {
    return (dispatch) => {
        apiKeyApi
            .get()
            .then((data) => {
                dispatch(getAPIKEYSuccess(data.data.key));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const getAPIKEYSuccess = (key) => {
    return {
        type: Types.GET_API_KEY,
        payload: {
            key,
        },
    };
};

export const changeAPIKEY = () => {
    return (dispatch) => {
        apiKeyApi
            .change()
            .then((data) => {
                dispatch(changeAPIKEYSuccess(data.data.key));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const changeAPIKEYSuccess = (key) => {
    return {
        type: Types.CHANGE_API_KEY,
        payload: {
            key,
        },
    };
};
