import { z } from 'zod'

export default z.object({
  timeAmmount: z
    .number()
    .positive({ message: 'Debe ser un valor mayor a cero' })
    .finite(),
  project: z.object({
    _id: z.string().nonempty({ message: 'Campo requerido' }),
    value: z
      .string()
      .trim()
      .toUpperCase()
      .nonempty({ message: 'Campo requerido' }),
  }),
  client: z.object({
    _id: z.string().nonempty({ message: 'Campo requerido' }),
    value: z
      .string()
      .trim()
      .toUpperCase()
      .nonempty({ message: 'Campo requerido' }),
  }),
})
