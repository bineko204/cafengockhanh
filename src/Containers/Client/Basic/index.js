import React, { useEffect } from "react";
import ClientHeader from "../../../Components/Client/ClientHeader";
import ClientFooter from "../../../Components/Client/ClientFooter";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "./../../../Actions";
import { toast } from "react-toastify";
import { Fab } from "@material-ui/core";
import callNow from "./../../../images/communications.png";
function Basic(props) {
    useEffect(() => {
        props.fetchListCategory("product_category");
        props.fetchListProduct();
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div>
            <ClientHeader
                match={props.match}
                productCate={props.productCate}
                products={props.products}
                user={props.user}
                handleLogout={() => {
                    props.logOut();
                    toast.success("Đăng xuất thành công");
                }}
            />
            {props.children}
            <ClientFooter />
            {/* =========scroll top */}
            <Fab
                size="small"
                variant="round"
                style={{
                    position: "fixed",
                    bottom: 100,
                    right: 36,
                    color: "#fff",
                    background: "rgb(135, 77, 52)",
                    zIndex: 999,
                }}
                onClick={scrollToTop}
            >
                <i className="fas fa-arrow-up"></i>
            </Fab>
            {/* ================Hotline */}
            <a href="tel:0979885146" className="call-btn">
                <img src={callNow} />
                <span>0979.885.146</span>
            </a>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        productCate: state.Category.productCategory,
        products: state.products.products,
        user: state.uiSetting.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchListCategory: (table) => {
            dispatch(actions.fetchListCategoryReQuest(table));
        },
        fetchListProduct: () => {
            dispatch(actions.fetchListProductReQuest());
        },

        logOut: () => {
            dispatch(actions.logout());
        },
    };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(Basic);
