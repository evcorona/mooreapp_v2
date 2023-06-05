import { z } from 'zod'

export default z
  .object({
    name: z.string().trim().nonempty({ message: 'Campo requerido' }),
    lastName: z.string().trim().nonempty({ message: 'Campo requerido' }),
    employeeNumber: z.string().trim().nonempty({ message: 'Campo requerido' }),
    email: z
      .string()
      .email({ message: 'Email inválido' })
      .toLowerCase()
      .trim()
      .nonempty({ message: 'Campo requerido' }),
    rol: z.enum(['Colaborador', 'Administrador']),
    positionJob: z.string().trim().nonempty({ message: 'Campo requerido' }),
    area: z.string().trim().nonempty({ message: 'Campo requerido' }),
    fee: z
      .number({
        required_error: 'Campo requerido',
        invalid_type_error: 'Dato inválido. Costo debe ser un número',
      })
      .positive()
      .min(1),
    partner: z.string().trim().nonempty({ message: 'Campo requerido' }),
    employmentDate: z.date({ required_error: 'Campo requerido' }),
  })
  .required()
