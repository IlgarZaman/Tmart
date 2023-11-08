import * as yup from "yup";

const updateSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Please Insert Name"),
  surname: yup
    .string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Please Insert Surname"),
  email: yup.string().email("Invalid Email").required("Please Insert Email"),
});

export { updateSchema };
