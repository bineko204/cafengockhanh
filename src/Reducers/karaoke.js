import * as Types from "../Constants";
var initialState = {
    list: [],
};

const Karaoke = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_KARAOKE_VIDEO:
            return { ...state, list: action.payload.data };
        default:
            return state;
    }
};
export default Karaoke;
