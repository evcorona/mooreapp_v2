import { z } from 'zod'

export default z.object({
  email: z
    .string()
    .email({ message: 'Introduce un email válido' })
    .nonempty({ message: 'Campo requerido' }),
  password: z.string().nonempty({ message: 'Campo requerido' }),
})
