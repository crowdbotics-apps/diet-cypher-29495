import { boolean, object, ref, string } from "yup"

const signupSchema = object({
  name: string().required("Name is required."),
  email: string().required("Email is required.").email("Email is invalid."),
  password: string().required("Password is required."),
  password2: string()
    .required("Confirm password is required.")
    .oneOf([ref("password")], "Passwords do not match."),
  agreement: boolean().required("").oneOf([true], "")
})

export default signupSchema
