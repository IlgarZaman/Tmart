import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Please Insert Name")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .test("Name-appropriateness", "Name not suitable", (value) => {
      const words = value.split(" ");
      return words.length === 1;
    }),
  surname: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Please Insert Surname")
    .test("Surname-appropriateness", "Surname not suitable", (value) => {
      const words = value.split(" ");
      return words.length === 1;
    }),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Please Insert Email"),
  password: yup
    .string()
    .min(8, "Use at least 8 characters!")
    .max(30, "Too Long!")
    .required("Please Insert Password"),
});

export { RegisterSchema };
