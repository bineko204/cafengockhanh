import {
    FormControl,
    FormHelperText,
    InputLabel,
    NativeSelect,
    Select,
} from "@material-ui/core";
import React from "react";

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return <FormHelperText>Vui lòng chọn danh mục</FormHelperText>;
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>;
    }
};
const renderSelectField = ({
    input,
    label,
    className,
    variant,
    meta: { touched, error },
    children,
    ...custom
}) => (
    <FormControl
        size="small"
        error={touched && error}
        className={className}
        variant={variant}
    >
        <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: input.name,
                id: "color-native-simple",
            }}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
);
export default renderSelectField;
