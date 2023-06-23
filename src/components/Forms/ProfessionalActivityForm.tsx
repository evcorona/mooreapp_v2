import { ActivitiesData, ClientsData, ProjectsData } from '~/types/objects'
import {
  createActivity,
  errorHandler as errorActivityHandler,
} from '~/lib/api/activities'
import {
  errorHandler as errorClientHandler,
  getAll as getAllClients,
} from '~/lib/api/clients'
import {
  errorHandler as errorProjectHandler,
  getProjectsByClientId,
} from '~/lib/api/projects'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { AxiosError } from 'axios'
import Button from '../Buttons/Button'
import ComboBox from '~/components/Inputs/ComboBox'
import Input from '~/components/Inputs/Input'
import clsx from 'clsx'
import schema from '~/schemas/professionalActivitySchema'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  date: string
  setOpen: (open: boolean) => void
}

export default function ProfessionalActivityForm(props: Props) {
  const [clientSelected, setClientSelected] = useState<string>('')
  const { data: allClients = [] } = useQuery<ClientsData[]>(
    'clients',
    getAllClients,
    { onError: error => errorClientHandler(error as AxiosError) }
  )
  const clientOptions = allClients.map(client => {
    return { _id: client._id, value: client.clientName }
  })

  const { data: clientProjects = [] } = useQuery<ProjectsData[]>({
    queryKey: ['projects', clientSelected],
    queryFn: () => getProjectsByClientId(clientSelected, 'professional'),
    enabled: !!clientSelected,
    onError: error => errorProjectHandler(error as AxiosError),
  })

  const projectOptions = clientProjects.map(project => {
    return {
      _id: project._id,
      value: project.codeProject,
    }
  })

  const { mutateAsync, isLoading: isSubmitting } = useMutation(createActivity, {
    onSuccess: () => {
      props.setOpen(false)
      toast.success('Actividad creada correctamente')
    },
    onError: error => errorActivityHandler(error as AxiosError),
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      client: {
        _id: '',
        value: '',
      },
      project: {
        _id: '',
        value: '',
      },
      timeAmmount: 0,
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  const clientValue = watch('client')

  function onSubmit(values: any) {
    const data: any = {
      clientID: values.client._id,
      projectID: values.project._id,
      timeAmmount: values.timeAmmount,
      activityType: 'Profesional',
      activityDate: props.date,
    }

    mutateAsync(data)
  }

  useEffect(() => setClientSelected(clientValue._id), [clientValue])

  return (
    <form
      className="flex animate-appear flex-col gap-2"
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
      <ComboBox
        name="project"
        label="Proyecto"
        placeholder="Seleccionar un proyecto del listado..."
        options={projectOptions}
        control={control}
        error={errors?.project?.message}
        required
      />
      <Input
        label="Horas trabajadas"
        type="number"
        name="timeAmmount"
        prefix="time"
        required
        register={register}
        error={errors?.timeAmmount?.message}
      />
      <div className="join join-horizontal">
        <Button outline className="join-item w-1/2" onClick={() => reset()}>
          Limpiar
        </Button>
        <Button
          isDisabled={!isValid}
          isSubmit
          primary
          className={clsx('join-item w-1/2', {
            'border-brand-gray border-2': !isValid,
            'bg-brand/50 hover:bg-brand/60 border-2 border-transparent':
              isValid,
          })}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
