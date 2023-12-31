import { z } from 'zod';

export const signinSchema = z.object({
	username: z.string().min(3, 'Username is required.'),
	password: z.string().min(8, 'Please enter a valid password.').max(20),
});

export const signupSchema = z
	.object({
		id: z.string().optional(),
		email: z.string().email('This will be what you use to sign in.'),
		username: z.string().min(3, 'Username is required.').max(10),
		password: z.string().min(8, 'Please enter a valid password.').max(20),
		passwordConfirm: z.string(),
		firstname: z.string().min(3, "What's your name?").max(10),
		lastname: z.string().min(3, "What's your name?").max(10),
		birthdate: z.string().min(8, 'Please enter a valid birthdate.').max(20),
		gender: z.string().optional(),
		phone: z.string().min(10, 'Please enter a valid phone number.').max(20),
		address1: z.string().min(3, 'Please enter a valid address.').max(20),
		address2: z.string().optional(),
		city: z.string().min(3, 'Please enter a valid city.').max(20),
		state: z.string().min(2, 'Please enter a valid state.').max(20),
		zipcode: z.string().min(5, 'Please enter a valid zipcode code.').max(20),
		country: z.string().min(3, 'Please enter a valid country.').max(20),
	})
	.refine(({ password, passwordConfirm }) => password === passwordConfirm);

export type InferredSigninSchema = z.infer<typeof signinSchema>;
export type InferredSignupSchema = z.infer<typeof signupSchema>;

export type User = Omit<InferredSignupSchema, 'password' | 'passwordConfirm'>;
