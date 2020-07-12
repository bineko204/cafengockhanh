const style = () => ({
    left: {
        height: "100%",
        minHeight: "80vh",
        backgroundImage:
            "url(//cdn.shopify.com/s/files/1/0169/4053/1812/files/img-1.jpg?v=1550665169)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "& h1": {
            fontFamily: "Pacifico",
            paddingBottom: "10px",
            fontSize: "2rem",
        },
        "& .title": {
            fontFamily: "Paytone One",
            fontSize: 16,
            padding: "10px 0",
            display: "block",
        },
        "&>div": {
            marginBottom: 20,
        },
    },
    searchField: {
        position: "relative",
    },

    searchAutoComplete: {
        boxShadow: "0 0 30px 0 rgba(0,0,0,0.15)",
        position: "absolute",
        top: "100%",
        left: 0,
        zIndex: 4,
        background: "#fff",
    },
    searchItem: {
        padding: 10,
        display: "flex",
        borderBottom: "1px dotted",
        cursor: "pointer",
        "&:hover": {
            background: "#f1f1f1",
        },
        "&>.thumb": {
            width: "20%",
            "&>img": {
                maxWidth: "100%",
            },
        },
        "&>.item-title": {
            width: "80%",
        },
    },
    cancelBtn: {
        position: "absolute",
        top: 43,
        right: 2,
        padding: "8px",
        zIndex: 5,
        "& i": {
            fontSize: "21px",
        },
    },
    wrList: {
        maxHeight: "300px",
        border: "1px solid #dedede",
        overflowY: "scroll",
        position: "relative",
        "&>ul>li": {
            height: "50px",
            display: "flex",
            background: "#fafafa",
            borderBottom: "1px solid #dedede",

            "&:nth-child(1)": {
                position: "sticky",
                top: 0,
                left: 0,
                zIndex: 3,
                "& * ": {
                    color: "#721799",
                },
            },
        },
        "& span": {
            fontFamily: "Paytone One",
            color: "#be9c79",
            fontSize: 16,
            padding: "10px 0",
            display: "block",
        },
    },
    stt: {
        width: 50,
        textAlign: "center",
        "& img": {
            marginTop: "-3px",
            width: 35,
            height: 35,
            borderRadius: "100%",
        },
    },
    orderBy: {
        width: 55,
        textAlign: "center",
    },
    name: {
        width: "calc(100% - 105px)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    tableChoose: {
        fontFamily: "Paytone One",
        fontSize: 16,
        display: "block",
    },
});
export default style;
