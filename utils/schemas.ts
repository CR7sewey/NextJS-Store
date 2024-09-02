import { z, ZodSchema } from "zod";
export const productSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Name must be at least 4 chars",
    })
    .max(20, {
      message: "Name must be 20 chars or less",
    }),
  company: z
    .string()
    .min(4, {
      message: "Company must be at least 4 chars",
    })
    .max(20, {
      message: "Company must be 20 chars or less",
    }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "Price must be at least 0 dollars",
  }),
});
export type Product = z.infer<typeof productSchema>;

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateImageFile(),
});

export function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const formatAccepted = ["image/"];
  return z
    .instanceof(File)
    .refine((image) => {
      return image.size > 0 && image.size <= maxUploadSize;
    }, "File size must be less than 1MB")
    .refine(
      (image) => {
        return (
          !image || formatAccepted.some((type) => image.type.startsWith(type))
        );
      },
      {
        message: "File must be an image",
      }
    );
}
