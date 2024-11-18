import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
    email: yup.string().email().required().label("Email"),
    password: yup
        .string()
        .min(8)
        .required()
        .label("Password")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            "Password must contain at least 8 characters, 1 letter, 1 number and 1 special character"
        ),
});