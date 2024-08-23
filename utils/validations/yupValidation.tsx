import * as yup from 'yup';
const SignInSchema = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

const SignUpSchema = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
});
const ProjectSchema = yup.object().shape({
	name: yup.string().required('Project Name is required'),
	description: yup.string().required('Description is required'),
	pineconeKey: yup.string().required('Pinecone Key is required'),
	elasticKey: yup.string().required('Elastic Key is required'),
});
export { SignInSchema, SignUpSchema, ProjectSchema };
