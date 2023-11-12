import { z } from 'zod';

export const signinSchema = z.object({
    identity: z.string().min(3, 'Username is required.').max(10),
    password: z.string().min(8, 'Please enter a valid password.').max(20),
});

export const signupSchema = z
    .object({
        firstname: z.string().min(3, "What's your name?").max(10),
        lastname: z.string().min(3, "What's your name?").max(10),
        email: z.string().email('This will be what you use to sign in.'),
        username: z.string().min(3, 'Username is required.').max(10),
        password: z.string().min(8, 'Please enter a valid password.').max(20),
        passwordConfirm: z.string(),
        birthday: z.string().min(8, 'Please enter a valid birthday.').max(20),
        gender: z.string().min(1, 'Please choose a gender. You can change this later.'),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm);

export type InferredSigninSchema = z.infer<typeof signinSchema>;
export type InferredSignupSchema = z.infer<typeof signupSchema>;
