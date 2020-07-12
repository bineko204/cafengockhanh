import * as Types from "./../Constants";
var initialState = {
    showModal: false,
    title: "",
    component: null,
};

const uiSetting = (state = initialState, action) => {
    switch (action.type) {
        case Types.SHOW_MODAL:
            return { ...state, showModal: action.payload.showModal };
        case Types.CHANGE_MODAL_TITLE:
            return { ...state, title: action.payload.title };
        case Types.CHANGE_MODAL_CONTENT:
            return { ...state, component: action.payload.component };
        default:
            return state;
    }
};
export default uiSetting;
