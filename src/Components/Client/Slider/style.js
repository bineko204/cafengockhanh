const style = (theme) => ({
    wrSlider: {
        [theme.breakpoints.down("sm")]: {
            marginTop: 60,
        },
    },
    sliderItem: {
        position: "relative",
        "& img": {
            width: "100%",
        },
    },
    content: {
        position: "absolute",
        height: "100%",
        top: 0,
        left: "50%",
        width: "40%",
        transform: "translateX(-50%) skew(-10deg)",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        "&>div": {
            transform: "skew(10deg)",
        },
        [theme.breakpoints.down("sm")]: {
            width: "80%",
        },
    },
    style2: {
        left: 0,
        transform: "translateX(0) skew(0deg)",
        "&>div": {
            transform: "skew(0deg)",
        },
    },
    icon: {
        width: "100%",
        "& img": {
            margin: "0 auto",
            width: 80,
            height: 80,
        },
    },
    text: {
        textAlign: "center",
        "& p": {
            fontFamily: "Paytone One",
            fontSize: "40px",
            color: "#874d34",
            textAlign: "center",
            margin: "20px auto",
            [theme.breakpoints.down("sm")]: {
                fontSize: "4vw",
            },
            "& strong": {
                textTransform: "uppercase",
                fontSize: "50px",
                [theme.breakpoints.down("sm")]: {
                    fontSize: "5vw",
                },
            },
        },
        "&>div": {
            // paddingTop: 20,
            color: "#fff",
            display: "inline-block",
            fontSize: "16px",
            position: "relative",
            fontFamily: "Pacifico",
            "&:before": {
                content: "''",
                width: "45px",
                height: "18px",
                backgroundImage:
                    "url(//cdn.shopify.com/s/files/1/0169/4053/1812/files/wine_small_576942c0-701e-4a28-8444-30534aadba8b_small.png?v=1551164005)",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
                verticalAlign: "middle",
                margin: "0 0 5px",
                position: "absolute",
                right: "105%",
                bottom: 0,
            },
            "&:after": {
                content: "''",
                width: "45px",
                height: "18px",
                backgroundImage:
                    "url(//cdn.shopify.com/s/files/1/0169/4053/1812/files/icon-1_6a3a527e-3210-4a21-85ca-9bd2cbf9205f_small.png?v=1572521547)",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
                verticalAlign: "middle",
                margin: "0 0 5px",
                position: "absolute",
                left: "105%",
                bottom: 0,
            },
        },
    },
});
export default style;
