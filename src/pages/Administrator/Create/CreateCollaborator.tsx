import { createCollaborator, errorHandler } from '~/lib/api/collaborators'

import { AxiosError } from 'axios'
import Button from '~/components/Button'
import Input from '~/components/Inputs/Input'
import ListBox from '~/components/Inputs/ListBox'
import Modal from '~/components/Modal'
import Title from '~/components/Title'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z
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

export default function CreateCollaborator() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')

  const { mutateAsync, isLoading } = useMutation(createCollaborator, {
    onSuccess: () => {
      setIsModalOpen(true)
      reset()
    },
    onError: error => errorHandler(error as AxiosError),
  })
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      employeeNumber: '',
      email: '',
      rol: '',
      positionJob: '',
      area: '',
      fee: 0,
      partner: '',
      employmentDate: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  function onSubmit(values: any) {
    setName(`${values.name} ${values.lastName}`)
    mutateAsync(values)
  }

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="¡Operación exitosa!"
        buttonText="Agregar otro"
        success
      >
        <p>
          El colaborador{' '}
          <span className="font-bold text-moore underline decoration-moore underline-offset-2">
            {name}
          </span>{' '}
          ha sido creado para acceder al portal
        </p>
      </Modal>
      <div className="container mx-auto space-y-4 px-4 pt-20 md:px-28">
        <Title title="nuevo colaborador" />
        <form
          className={clsx(
            'rounded px-4 py-8 md:p-8',
            'flex flex-col gap-2',
            'bg-white shadow-md'
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid-cols-2 space-y-4 md:gap-4 md:space-y-0 lg:grid">
            <Input
              label="Nombre"
              type="text"
              name="name"
              register={register}
              placeholder="Nombre del colaborador..."
              error={errors?.name?.message}
              required
            />
            <Input
              label="Apellidos"
              type="text"
              name="lastName"
              register={register}
              placeholder="Apellidos del colaborador..."
              error={errors?.lastName?.message}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              register={register}
              placeholder="Email del empleado..."
              error={errors?.email?.message}
              required
            />
            <ListBox
              name="rol"
              label="Rol"
              placeholder="Rol del empleado en la plataforma..."
              options={['Administrador', 'Colaborador']}
              control={control}
              error={errors?.rol?.message}
              required
            />
            <Input
              label="Número de empleado"
              type="text"
              name="employeeNumber"
              register={register}
              placeholder="######"
              error={errors?.employeeNumber?.message}
              required
            />
            <Input
              label="Puesto laboral"
              type="text"
              name="positionJob"
              register={register}
              placeholder="Puesto del empleado..."
              error={errors?.positionJob?.message}
              required
            />
            <Input
              label="Área"
              type="text"
              name="area"
              register={register}
              placeholder="Área del empleado..."
              error={errors?.area?.message}
              required
            />
            <Input
              label="Socio"
              type="text"
              name="partner"
              register={register}
              placeholder="Socio correspondiente al empleado..."
              error={errors?.partner?.message}
              required
            />
            <Input
              label="Cuota por hora"
              type="number"
              prefix="currency"
              name="fee"
              register={register}
              placeholder="0000"
              error={errors?.fee?.message}
              required
            />
            <Input
              label="Fecha de inicio laboral"
              type="date"
              name="employmentDate"
              register={register}
              placeholder="Fecha de inicio laboral del empleado..."
              error={errors?.employmentDate?.message}
              required
            />
          </div>
          <div className="btn-group">
            <Button outline className="w-1/2" onClick={() => reset()}>
              Limpiar
            </Button>
            <Button
              isDisabled={!isValid}
              isSubmit
              primary
              className={clsx('w-1/2', {
                'border-brand-gray border-2': !isValid,
                'bg-brand/50 hover:bg-brand/60 border-0': isValid,
              })}
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
