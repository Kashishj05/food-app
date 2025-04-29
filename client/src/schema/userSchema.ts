import {z} from "zod";

export const userSignupSchema = z.object({
    fullname:z.string().min(1,"Fullname is required"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"password must have atleast 6 characters"),
    contact: z.string().min(10,"conctact number must have 10 digits")
});

export const userLoginSchema = z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"password must have atleast 6 characters"),
});

export type Logininputstate = z.infer<typeof userLoginSchema>;
export type Signupinputstate = z.infer<typeof userSignupSchema>;