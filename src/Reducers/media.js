import * as Types from "../Constants";
var initialState = {
    listImage: [],
};

const Media = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_IMAGE_SUCCESS:
            return { ...state, listImage: action.payload.listImage.reverse() };
        case Types.ADD_IMAGE_SUCCESS:
            return {
                ...state,
                listImage: action.payload.image.concat(state.listImage),
            };
        
        default:
            return state; 
    }
};
export default Media;
