import { object, ref, string } from "yup"

const newPasswordSchema = object({
  password: string().required("Password is required."),
  password2: string()
    .required("Confirm password is required.")
    .oneOf([ref("password")], "Passwords do not match."),
  0: string().max(1).required("Token is required"),
  1: string().max(1).required("Token is required"),
  2: string().max(1).required("Token is required"),
  3: string().max(1).required("Token is required")
})

export default newPasswordSchema
