import { ClientsData, ProjectsData } from '~/types/objects'
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
import ComboBox from '~/components/Inputs/ComboBox'
import Input from '~/components/Inputs/Input'
import clsx from 'clsx'
import { createActivity } from '~/lib/api/activities'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export default function ProfessionalActivityForm() {
  const params = useParams()

  console.log(params)

  const [clientSelected, setClientSelected] = useState('')
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
    queryFn: () => getProjectsByClientId(clientSelected),
    enabled: !!clientSelected,
    onError: error => errorProjectHandler(error as AxiosError),
  })

  const projectOptions = clientProjects.map(project => {
    return { _id: project._id, value: project.codeProject }
  })

  const { mutateAsync } = useMutation(createActivity)

  const {
    register,
    handleSubmit,
    control,
    watch,
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
    //resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  const clientValue = watch('client')

  function onSubmit(values: any) {
    const data = {
      clientID: values.client._id,
      projectID: values.project._id,
      timeAmmount: values.timeAmmount,
      projectType: 'Profesional',
      //activityDate: selectedDate
    }
    console.log(values)
  }

  useEffect(() => setClientSelected(clientValue._id), [clientValue])

  return (
    <form
      className={clsx('rounded px-4 py-8 md:p-8', 'flex flex-col gap-2')}
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
    </form>
  )
}
