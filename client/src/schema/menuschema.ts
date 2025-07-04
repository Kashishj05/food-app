import { z } from "zod";

export const menuschema = z.object({
  name: z.string().nonempty({ message: " name is required" }),
  discription: z.string().nonempty({ message: "description is required" }),
  price: z.number().min(0, { message: "Price can not be negative" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});
export type MenuformSchema = z.infer<typeof menuschema>;
