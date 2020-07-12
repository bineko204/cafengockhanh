const validate = (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = "Không được để trống";
    } else if (values.title.length < 3) {
        errors.title = "Phải có nhiều hơn 3 ký tự";
    }
    if(!values.price){
      errors.price = "Không được để trống";
    }
    if(!values.image){
      errors.image ="Không được để trống";
    }
    return errors;
};

export default validate;
