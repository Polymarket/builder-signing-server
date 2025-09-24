import { z } from "zod";

export const SignRequest = z.object({
    path: z.string().min(1),
    method: z.string().min(1),
    body: z.string().optional(),
});