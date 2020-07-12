const style = () => ({
    menuOrder: {
        "& *": {
            fontFamily: "Pacifico",
            color: "#874d34",
        },
        "& h3": {
            fontWeight: "bold",
        },
        "& span": {
            fontSize: "1rem",
            padding: "0 5px",
            position: "relative",
            background: "#FFF",
        },
        background: "#fff",
    },
    cateName: {
        textAlign: "center",
    },
    menuItem: {
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        paddingTop: "15px",
        "&:before": {
            content: "''",
            display: "block",
            position: "absolute",
            width: "100%",
            height: "2px",
            borderBottom: "1px dotted #000",
            transition: "all 0.3s" ,
            bottom: 5,
            left: 0,
        },
        "&:hover:before": {
            borderBottom: "1px solid #000",
        }
    },
});
export default style;
