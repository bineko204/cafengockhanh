const style = () => ({
    Gallery: {
        "& h3": {
            textAlign: "center",
            fontFamily: "Pacifico",
            paddingBottom: "30px",
            fontWeight: "bold",
            color: "#514242",
        },
    },
    galleryItem: {
        width: 200,
        height: 200,
        "&>div": {
            height: "100%",
            position: "relative",
            "& a": {
                width: "99%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                "& img": {
                    margin: "0 auto",
                },
            },
        },
    },
});
export default style;
