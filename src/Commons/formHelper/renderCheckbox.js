import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
const renderCheckbox = ({ input, label }) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                    
                />
            }
            label={label}
        />
    </div>
);
export default renderCheckbox;
