import { z } from 'zod';

const createUserZodSchema = z.object({
    body:z.object({
        name:z.string({
            required_error:'Name Required'
        }),
        password:z.string({
            required_error:"Password Required"
        }),
        email:z.string({
            required_error:'Please provide your email'
        })
    })
})

export const UserValidation = {
    createUserZodSchema
  };