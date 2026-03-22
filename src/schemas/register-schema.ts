import {z} from "zod"

export const registerSchema = z.object({
    username: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Só letras, números e _"),

    password: z 
    .string()
    .min(6, "Mínimo 6 caracteres")
    .regex(/[A-Z]/, "Ao menos 1 letra maiúscula")
    .regex(/[0-9]/, "Ao menos 1 número"),

    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
message: "Senhas não conicidem",
path: ["confirmPassword"]
})

export type RegisterFormData = z.infer<typeof registerSchema>