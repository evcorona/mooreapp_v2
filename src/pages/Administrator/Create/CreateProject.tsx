import { ClientsData, CollaboratorsData } from '~/types/objects'
import { createProject, errorHandler } from '~/lib/api/projects'
import { useMutation, useQuery } from 'react-query'

import { AxiosError } from 'axios'
import Button from '~/components/Button'
import ComboBox from '~/components/Inputs/ComboBox'
import Input from '~/components/Inputs/Input'
import Modal from '~/components/Modal'
import Title from '~/components/Title'
import clsx from 'clsx'
import { getAll as getAllClients } from '../../../lib/api/clients'
import { getManagers } from '../../../lib/api/collaborators'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  codeProject: z
    .string()
    .trim()
    .toUpperCase()
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

export default function CreateProject() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')

  const { data: allClients = [] } = useQuery<ClientsData[]>(
    'clients',
    getAllClients
  )
  const clientOptions = allClients.map(client => {
    return { _id: client._id, value: client.clientName }
  })

  const { data: allManagers = [] } = useQuery<CollaboratorsData[]>(
    'managers',
    getManagers
  )
  const managersOptions = allManagers.map(manager => {
    return { _id: manager._id, value: `${manager.name} ${manager.lastName}` }
  })

  const { mutateAsync, isLoading } = useMutation(createProject, {
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
    control,
  } = useForm({
    defaultValues: {
      codeProject: '',
      projectType: '',
      client: {},
      manager: {},
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  function onSubmit(values: any) {
    const { client, manager, ...restValues } = values

    const valuesConformed = {
      clientID: client._id,
      ...restValues,
    }
    if (manager._id) valuesConformed.managerID = manager._id

    setName(values.codeProject)
    mutateAsync(valuesConformed)
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
          El proyecto{' '}
          <span className="font-bold text-moore underline decoration-moore underline-offset-2">
            {name}
          </span>{' '}
          ha sido creado y esta disponible para la creación de actividades
        </p>
      </Modal>
      <div className="container mx-auto space-y-4 px-4 pt-20 md:px-28">
        <Title title="nuevo proyecto" />
        <form
          className={clsx(
            'rounded px-4 py-8 md:p-8',
            'flex flex-col gap-2',
            'bg-white shadow-md'
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ComboBox
            name="client"
            label="Cliente"
            placeholder="Seleccionar un cliente del listado..."
            options={clientOptions}
            control={control}
            error={errors?.client?.message}
            required
          />
          <Input
            label="Código del proyecto"
            type="text"
            name="codeProject"
            register={register}
            placeholder="XXX-XXXX"
            error={errors?.codeProject?.message}
            required
          />
          <Input
            label="Tipo de proyecto"
            type="text"
            name="projectType"
            register={register}
            placeholder="Nombre del proyecto..."
            error={errors?.projectType?.message}
            required
          />
          <ComboBox
            name="manager"
            label="Gerente"
            placeholder="Seleccionar un gerente del listado..."
            options={managersOptions}
            control={control}
            error={errors?.manager?.message}
          />

          <div className="btn-group mt-4">
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
