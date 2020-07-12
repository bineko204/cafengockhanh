const style = (theme) => ({
    wrHeader: {
        position: "fixed",
        zIndex: "10",
        width: "100%",
        top: 0,
    },
    siteHeader: {
        background: "#473c3c",
        minHeight: 60,
        padding: "0 50px",
        position: "relative",
        top: 0,
        "&>div": {
            position: "static",
        },
        [theme.breakpoints.down("sm")]: {
            padding: "0 20px",
            background: "#473c3c!important",
        },
    },
    isHomePage: {
        background: "transparent",
    },
    opacity: {
        background: "#301914",
    },

    wrLogo: {},
    logo: {},
    wrMenu: {
        [theme.breakpoints.down("sm")]: {
            order: 3,
        },
    },
    navBar: {
        height: "100%",
    },
    navBar: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    siteNav: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        margin: 0,
        padding: 0,
        [theme.breakpoints.down("sm")]: {
            display: "block",
            width: 300,
        },
    },
    menuItem: {
        display: "block",

        height: "100%",
        padding: "0 20px",
        fontFamily: "Paytone One",
        "& a": {
            lineHeight: "60px",
            color: "#fff",
            [theme.breakpoints.down("sm")]: {
                lineHeight: "60px",
                color: "#888",
            },
        },
        "&>a": {
            textTransform: "uppercase",
        },
        [theme.breakpoints.down("sm")]: {
            color: "#000",
            height: "auto",
        },
    },
    hide: {
        "&>div": {
            transform: "scaleY(0)",
            [theme.breakpoints.down("sm")]: {
                display: "none",
            },
        },
    },
    show: {
        "&>div": {
            transform: "scaleY(1)",
            visibility: "visible",
            [theme.breakpoints.down("sm")]: {
                display: "block",
            },
        },
    },
    childMenu: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        background: "#fff",
        width: "70%",
        visibility: "hidden",
        transformOrigin: "0 0",
        transition: "all 0.4s ease-in-out",
        margin: "auto",
        color: "#000",
        "&>ul": {
            maxWidth: "100%",
            width: "100%",
            padding: 35,
            overflow: "hidden",
            boxShadow: "0 0 30px 0 rgba(0,0,0,0.15)",
            [theme.breakpoints.down("sm")]: {
                padding: "10px 15px",
            },
            "& h5": {
                fontFamily: "Paytone One",
                textTransform: "uppercase",
                fontWeight: "bold",
                padding: "10px 0",
                [theme.breakpoints.down("sm")]: {
                    fontSize: 14,
                },
            },
        },
        [theme.breakpoints.down("sm")]: {
            position: "static",
            display: "none",
            width: "100%",
        },
    },
    menuLv3: {
        "&>li": {
            padding: "8px 0",
            "&>i": {
                color: "#be9c79",
                paddingRight: 8,
            },
            "& a": {
                color: "#be9c79",
            },
        },
    },
    wrUser: {
        height: "100%",
        display: "flex",
    },
    wrSearch: {
        height: "100%",
        display: "flex",
    },
    user: {
        color: "#fff",
    },
    wrMobileMenu: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
        },
    },
    hot: {
        display: "block",
        position: "relative",
        "&:before": {
            position: "absolute",
            right: -25,
            top: 3,
            content: "'Hot'",
            display: "inline",
            background: "red",
            padding: "0 3px",
            lineHeight: "20px",
            fontSize: 12,
            color: "#fff",
            borderRadius: "4px",
            // animation: "glowing 0.5s infinite",
        },
    },
});
export default style;
