import * as yup from "yup";

const updateSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Too Short!")
    .max(100, "Too Long!")
    .required("Please Insert Name"),
  description: yup
    .string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Please Insert description"),
  type: yup
    .string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Please Insert Type"),
  sale: yup
    .number()
    .min(0, "Too Incorrect Price!")
    .required("Please Insert sale Price"),
  discounted: yup.number().max(100, "Too Long!"),
  size: yup.string().max(50, "Too Long!"),
  color: yup.string().max(100, "Too Long!"),
  material: yup.string().max(500, "Too Long!"),
});

export { updateSchema };
