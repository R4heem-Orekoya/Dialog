import { z } from "zod";
import { User } from "../../types"

export const signInValidator = z.object({
   email: z.string().email({message: "Enter a valid email."}),
   password: z.string().min(1, {message: "This field cannot be empty."})
})

export const signUpValidator = z.object({
   email: z.string().email({message: "Enter a valid email."}),
   name: z.string().min(1, { message: "This field is required." }),
   password: z.string().min(8, {message: "Password must contain atleast 8 characters."})
})

export const userSchema = z.object({
   email: z.string().email(),
   name: z.string().min(1),
   password: z.string().min(8),
})

export const messageSchema = z.object({
   message: z.string().min(1)
})

export const groupSchema = z.object({
   name: z.string().min(3, { message: "Group name must contain atleast 3 characters." }),
   selectedUsers: z.array(z.object({
      name: z.string().nullable(),
      id: z.string(),
      createdAt: z.date().nullable(),
      email: z.string().nullable(),
      emailVerified: z.date().nullable(),
      image: z.string().nullable(),
      image_key: z.string().nullable(),
      updatedAt: z.date(),
      conversationIds: z.array(z.string()),
      seenMessageIds: z.array(z.string()),
   })).min(2, { message: "Atleast 2 users must be selected." })
})

export type TsignInValidator = z.infer<typeof signInValidator>
export type TsignUpValidator = z.infer<typeof signUpValidator>
export type TMessageSchema = z.infer<typeof messageSchema>
export type TGroupSchema = z.infer<typeof groupSchema>