import { createClient, errorHandler } from '~/lib/api/clients'

import { AxiosError } from 'axios'
import Button from '~/components/Button'
import Input from '~/components/Inputs/Input'
import Modal from '~/components/Modal'
import TextArea from '~/components/Inputs/TextArea'
import Title from '~/components/Title'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
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

export default function CreateClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const { mutateAsync, isLoading } = useMutation(createClient, {
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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      clientName: '',
      codeClient: '',
      group: '',
      RFC: '',
      address: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  function onSubmit(values: any) {
    setName(values.clientName)
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
          El cliente{' '}
          <span className="font-bold text-moore underline decoration-moore underline-offset-2">
            {name}
          </span>{' '}
          ha sido creado y esta disponible para asignación de proyectos
        </p>
      </Modal>
      <div className="container mx-auto space-y-4 px-4 pt-20 md:px-28">
        <Title title="nuevo cliente" />
        <form
          className={clsx(
            'rounded px-4 py-8 md:p-8',
            'flex flex-col gap-2',
            'bg-white shadow-md'
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Cliente"
            type="text"
            name="clientName"
            register={register}
            placeholder="Nombre del cliente..."
            error={errors?.clientName?.message}
            required
          />
          <Input
            label="Código del cliente"
            type="text"
            name="codeClient"
            register={register}
            placeholder="XXX"
            error={errors?.codeClient?.message}
            required
          />
          <Input
            label="Grupo"
            type="text"
            name="group"
            register={register}
            placeholder="Nombre del grupo..."
            error={errors?.group?.message}
            required
          />
          <Input
            label="RFC"
            type="text"
            name="RFC"
            register={register}
            placeholder="XXXXXXXXXX"
            error={errors?.RFC?.message}
            required
          />
          <TextArea
            label="Domicilio"
            type="text"
            name="address"
            register={register}
            placeholder="Domicilio fiscal del cliente..."
            error={errors?.address?.message}
            required
          />

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
