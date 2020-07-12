import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/styles";
import style from "./style";
import { Fab, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
function MyModal(props) {
    const { openModal, content, title, classes } = props;

    const handleClose = () => {
        props.closeModal();
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal} className={classes.modal}>
                    <div>
                        <div className={classes.wrTitle}>
                            <h3 className={classes.title}>{title}</h3>
                            <Button margin="none" size="small" color="inherit" onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </div>
                        <div className={classes.content}>{content}</div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
export default withStyles(style)(MyModal);
