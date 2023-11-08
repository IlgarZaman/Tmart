import * as yup from "yup";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Please Insert Email"),
  password: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Insert Password"),
});

export { LoginSchema };
