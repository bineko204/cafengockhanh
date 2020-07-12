const style = () => ({
    modal: {
        position: "fixed",
        // top: "30px",
        // left: "30px",
        // right: "30px",
        // bottom: 30,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        overflow: "hidden",
    },
    wrTitle: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 10px",
        borderBottom: "1px solid #666",
    },
    content: {
        // height: "calc(100% - 43px)",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        paddingTop: 5,
        lineHeight: "30px"
    }
});
export default style;
