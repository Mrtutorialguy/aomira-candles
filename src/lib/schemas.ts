import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  description: z.string(),
  price: z.number().positive(),
  waxType: z.string(),
  burnTimeHours: z.number().int().positive(),
  weightOz: z.number().positive(),
  vessel: z.string(),
  notes: z.object({
    top: z.array(z.string()),
    heart: z.array(z.string()),
    base: z.array(z.string()),
  }),
  inStock: z.boolean(),
  image: z.string(),
  featured: z.boolean().default(false),
});

export const OrderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const CreateOrderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  shippingAddress: z.object({
    street: z.string().min(3, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State/Province is required"),
    postalCode: z.string().min(3, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
  }),
  items: z.array(OrderItemSchema).min(1, "At least one item is required in the cart"),
});

export const ContactInquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.enum(["general", "wholesale", "custom_scent", "event_gifting"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type Product = z.infer<typeof ProductSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type ContactInquiryInput = z.infer<typeof ContactInquirySchema>;
