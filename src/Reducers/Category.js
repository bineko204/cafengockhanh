import * as Types from "../Constants";
var initialState = {
    listCategory: [],
    productCategory: [],
    articleCategory: [],
    CategoryInfo: null,
};

const ProductCategory = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_LIST_CATEROGY_SUCCESS:
            return {
                ...state,
                listCategory: action.payload.listCategory,
                productCategory: action.payload.table ==="product_category" ? action.payload.listCategory: [],
                articleCategory: action.payload.table ==="article_category" ? action.payload.listCategory: [],
            };
        case Types.REMOVE_CATEGORY_INFO:
            return { ...state, CategoryInfo: null};
        case Types.FETCH_CATEGORY_INFO_SUCCESS:
            let temp = action.payload.Category
                ? action.payload.Category[0]
                : null;
            return { ...state, CategoryInfo: action.payload.Category[0] };
        default:
            return state;
    }
};
export default ProductCategory;
