const style = (theme) => ({
    wrapper: {
        marginTop: 60,
        background: "#fff",
    },
    breadcrumb: {
        padding: "10px 0",
        textAlign: "center",
        // fontFamily: "Paytone One",
        fontFamily: "Pacifico",
        color: "#473c3c",
        background: "#f4f4f4",
        "& nav": {
            display: "inline-block",
            "& *": {
                fontFamily: "Paytone One",
            },
        },
    },
    left: {
        [theme.breakpoints.down("sm")]: {
            order: 2,
        },
    },
    wrDesc: {
        "& h2": {
            fontFamily: "Pacifico",
            color: "#514242",
        },
        "& .price": {
            fontFamily: "Pacifico",
            fontSize: "1.6rem",
            color: "#be9c79",
        },
        "& .description": {
            paddingTop: 30,
            fontFamily: "Paytone One",
            fontSize: "16px",
        },
    },
    wrDetail: {
        paddingTop: 30,
        "& *": {
            fontFamily: "Paytone One",
        },
        "& .title": {
            fontFamily: "Pacifico",
            padding: "10px 0",
            display: "block",
            borderBottom: "1px solid ",
            marginBottom: 10,
        },
    },
});
export default style;
