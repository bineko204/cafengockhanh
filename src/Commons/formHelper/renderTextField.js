import { TextField } from "@material-ui/core";
import React from "react";
export const renderTextField = ({
    input,
    label,
    meta: { touched, error, invalid },
    ...custom
}) => (
    <TextField
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        margin="normal"
        {...input}
        {...custom}
    />
);
export default renderTextField;
