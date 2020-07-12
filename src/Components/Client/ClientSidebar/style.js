const style = () => ({
    wrSidebar: {
        "& h3": {
            width: "100%",
            position: "relative",
            background: " #be9c79",
            color: "#fff",
            padding: "12px 15px",
            borderBottom: "2px solid",
            fontFamily: "Pacifico",
        },
        "&>ul": {
            padding: 0,
            "& li ul li": {
                borderBottom: "1px dotted",
                "&:hover": {
                    background: "#f4f4f4",
                },
            },
            "&>li>span": {
                fontFamily: "Pacifico",
                color: "#888",
                fontSize: "18px",
            },
        },
        "& span": {
            padding: "5px 0",
            display: "block",
            fontFamily: "Pacifico",
            color: "#be9c79",
        },
    },
});
export default style;
