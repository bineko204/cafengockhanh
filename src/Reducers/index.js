import { combineReducers } from "redux";
import products from "./products";
import { reducer as formReducer } from "redux-form";
import Category from "./Category";
import articles from "./articles";
import uiSetting from "./uiSetting";
import modal from "./modal";
import media from "./media";
import karaoke from "./karaoke";
const appReducers = combineReducers({
    products,
    articles,
    Category,
    form: formReducer,
    uiSetting,
    modal,
    media,
    karaoke,
});
export default appReducers;
