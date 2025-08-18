import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(200),
    slug: z.string().min(3).max(200),
    description: z.string().min(3).max(500).optional().or(z.literal('')),
    category: z.string().min(3).max(200),
    level: z.string().min(3).max(200),
});