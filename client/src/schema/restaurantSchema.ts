import { z } from "zod";

export const restaurantformschema = z.object({
  restaurantName: z
    .string()
    .nonempty({ message: "Restaurant name is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  country: z.string().nonempty({ message: "Country name is required" }),
  deliverytime: z
    .number()
    .min(0, { message: " Delivery time can not be negative" }),
  cuisines: z.array(z.string()),
  imagefile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});
export type RestaurantFormSchema = z.infer<typeof restaurantformschema>;
