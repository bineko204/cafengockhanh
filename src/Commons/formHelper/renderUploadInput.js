import React, { Component } from "react";
import { Button, FormHelperText } from "@material-ui/core";

export default class FieldFileInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            imgError: "",
        };
    }

    onChange(e) {
        const {
            input: { onChange },
        } = this.props;
        onChange(e.target.files[0]);
        let file = e.target.files[0];
        if (file.size > 2300000) {
            this.setState({
                imgError: "Kích thước ảnh quá lớn!",
            });
        }
        let img = document.getElementById("img");
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            img.src = reader.result;
        };
        // console.log(reader.result.size);
    }

    render() {
        const {
            input: { value },
        } = this.props;
        const { input, label, required, meta } = this.props; //whatever props you send to the component from redux-form Field
        const { imgError } = this.state;
        const { touched, error } = meta;
        const renderFromHelper = ({ touched, error }) => {
            if (imgError) {
                return (
                    <FormHelperText className="text-center text-danger">
                        {imgError}
                    </FormHelperText>
                );
            }
            if (touched && error) {
                return (
                    <FormHelperText className="text-center text-danger">
                        {error}
                    </FormHelperText>
                );
            }
        };
        return (
            <div>
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        size="small"
                    >
                        Chọn ảnh
                    </Button>
                </label>
                <div>
                    <input
                        id="contained-button-file"
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        onChange={this.onChange}
                        className="d-none"
                    />
                </div>
                {renderFromHelper({ touched, error })}
            </div>
        );
    }
}
