import { z } from 'zod'

export default z.object({
  codeProject: z
    .string()
    .trim()
    .toUpperCase()
    .min(5)
    .nonempty({ message: 'Campo requerido' }),
  projectType: z
    .string()
    .trim()
    .toUpperCase()
    .nonempty({ message: 'Campo requerido' }),
  client: z.object({
    _id: z.string().nonempty({ message: 'Campo requerido' }),
    value: z
      .string()
      .trim()
      .toUpperCase()
      .nonempty({ message: 'Campo requerido' }),
  }),
  manager: z.object({
    _id: z.string().optional(),
    value: z.string().optional(),
  }),
})
