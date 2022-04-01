import * as yup from "yup";

const formSchema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .required()
    .min(2, "name must be at least 2 characters"),
    size: yup
    .string()
    .oneOf(['--14inch', '--16inch', '--18inch'], 'No Pizza?'),
    
})

export default formSchema