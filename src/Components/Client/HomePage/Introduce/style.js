const style = () => ({
    introduce: {
        paddingTop: "60px",
        paddingBottom: "60px",

        backgroundColor: "#fff",
    },
    title: {
        color: "#514242",
        marginBottom: "40px",
        fontFamily: "Pacifico",
        fontWeight: "bold",
        lineHeight: "55px",
    },
    center: {
        marginTop: "-35px",
    },
    left: {
        paddingTop: "50px",
        "& .item": {
            display: "flex",
            flexDirection: "row-reverse",
            marginBottom: "40px",
            "&:hover .image": {
                transform: "rotateY(-180deg)",
            },

            "& .image": {
                width: 60,
                marginLeft: 40,
                transition: "all 0.3s",
            },
            "& .text": {
                color: "#874d34",
                textAlign: "right",
                "& h5": {
                    paddingBottom: 20,
                    fontWeight: "bold",
                    fontFamily: "Pacifico",
                },
            },
        },
    },
    right: {
        paddingTop: "50px",
        "& .item": {
            display: "flex",
            marginBottom: "40px",
            "&:hover .image": {
                transform: "rotateY(-180deg)",
            },
            "& .image": {
                width: 60,
                marginRight: 40,
                transition: "all 0.3s",
            },
            "& .text": {
                color: "#874d34",
                textAlign: "left",
                "& h5": {
                    paddingBottom: 20,
                    fontWeight: "bold",
                    fontFamily: "Pacifico",
                },
            },
        },
    },
});
export default style;
