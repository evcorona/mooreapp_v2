import { z } from 'zod'

export default z.object({
  clientName: z
    .string()
    .trim()
    .toUpperCase()
    .nonempty({ message: 'Campo requerido' }),
  codeClient: z
    .string()
    .trim()
    .toUpperCase()
    .nonempty({ message: 'Campo requerido' }),
  group: z
    .string()
    .trim()
    .toUpperCase()
    .nonempty({ message: 'Campo requerido' }),
  RFC: z
    .string()
    .trim()
    .toUpperCase()
    .min(8, { message: 'Un RFC válido debe tener un mínimo de 8 caracteres' })
    .max(22)
    .nonempty({ message: 'Campo requerido' }),
  address: z
    .string()
    .trim()
    .toUpperCase()
    .nonempty({ message: 'Campo requerido' }),
})
