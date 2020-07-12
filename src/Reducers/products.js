import * as Types from "./../Constants";
var initialState = {
    products: [],
    productInfo: null,
};

const Products = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.products,
            };
        case Types.REMOVE_PRODUCT_INFO:
            return { ...state, productInfo: null };
        case Types.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.concat([action.payload.product]),
            };
        case Types.GET_PRODUCT_INFO_SUCCESS:
            let status =
                action.payload.product[0].status === "0" ? false : true;
            let product = { ...action.payload.product[0], status: status };
            return { ...state, productInfo: product };
        case Types.GET_PRODUCT_INFO_FAILED:
            return { ...state, productInfo: "404" };
        default:
            return state;
    }
};
export default Products;
