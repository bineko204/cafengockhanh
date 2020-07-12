import * as Types from "./../Constants";
var initialState = {
    showBackDrop: false,
    showAdminSidebar: false,
    redirect: null,
    user: [],
    config: {},
    apiKey: null,
};

const uiSetting = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_LIST_CATEROGY:
            return { ...state, showBackDrop: true, redirect: null };
        case Types.FETCH_LIST_CATEROGY_SUCCESS:
            return { ...state, showBackDrop: false };
        case Types.FETCH_PRODUCTS:
            return { ...state, showBackDrop: true, redirect: null };
        case Types.FETCH_PRODUCTS_SUCCESS:
            return { ...state, showBackDrop: false };
        case Types.ADD_CATEGORY_SUCCESS:
            return { ...state, redirect: action.payload.redirect };
        case Types.UPDATE_CATEGORY_SUCCESS:
            return { ...state, redirect: action.payload.redirect };
        case Types.ADD_PRODUCT_SUCCESS:
            return { ...state, redirect: "/admin/products" };
        case Types.UPDATE_PRODUCT_SUCCESS:
            return { ...state, redirect: "/admin/products" };
        case Types.ADD_ARTICLE_SUCCESS:
            return { ...state, redirect: "/admin/articles" };
        case Types.UPDATE_ARTICLE_SUCCESS:
            return { ...state, redirect: "/admin/articles" };
        case Types.CHECK_LOGIN_SUCCESS:
            if (action.payload.data[0].remember === "true") {
                localStorage.setItem("userId", action.payload.data[0].id);
            }
            if (typeof Storage !== "undefined") {
                sessionStorage.userId = action.payload.data[0].id;
            } else {
                document.write(
                    "Trình duyệt của bạn không hỗ trợ local storage"
                );
            }
            return { ...state, redirect: "/admin" };
        case Types.GET_USER_INFO:
            let date = new Date(action.payload.user.date_of_birth * 1000);
            let text = "";
            text += date.getFullYear() + "-";
            text +=
                (date.getMonth() + 1 < 10 ? "0" : "") +
                (date.getMonth() + 1) +
                "-";
            text += date.getDate();
            const user = { ...action.payload.user, date_of_birth: text };
            return { ...state, user: user };
        case Types.LOGOUT:
            localStorage.removeItem("userId");
            sessionStorage.removeItem("userId");

            return { ...state, user: [] };
        case Types.GET_SITE_CONFIG:
            return { ...state, config: { ...action.payload.config } };
        case Types.CHANGE_SITE_CONFIG:
            return { ...state, config: { ...action.payload.config } };
        case Types.SHOW_ADMIN_SIDEBAR:
            return {
                ...state,
                showAdminSidebar: action.payload.status,
            };
        case Types.GET_API_KEY:
            return { ...state, apiKey: action.payload.key };
        case Types.CHANGE_API_KEY:
            return { ...state, apiKey: action.payload.key };
        default:
            return state;
    }
};
export default uiSetting;
