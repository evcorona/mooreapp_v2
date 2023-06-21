import { ClientsData, CollaboratorsData } from '~/types/objects'
import ProjectForm, { ProjectFormTypes } from '~/components/Forms/ProjectForm'
import { errorHandler, getById, updateProject } from '~/lib/api/projects'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { AxiosError } from 'axios'
import Title from '~/components/Title'
import { getAll as getAllClients } from '~/lib/api/clients'
import { getManagers } from '~/lib/api/collaborators'
import { toast } from 'react-toastify'

export default function EditProject() {
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const { data: projectData } = useQuery('project', () => getById(id))

  //Get all clients to conform combobox options
  const { data: allClients = [] } = useQuery<ClientsData[]>(
    'clients',
    getAllClients
  )
  const clientOptions = allClients.map(client => {
    return { _id: client._id, value: client.clientName }
  })

  //Get all managers to conform combobox options
  const { data: allManagers = [] } = useQuery<CollaboratorsData[]>(
    'managers',
    getManagers
  )
  const managerOptions = allManagers.map(manager => {
    return { _id: manager._id, value: `${manager.name} ${manager.lastName}` }
  })

  //Conform the initial values for the form fields
  const clientSelected = clientOptions.find(
    option => option.value === projectData?.clientName
  )
  const managerSelected = managerOptions.find(
    option => option._id === projectData?.managerID?._id
  )
  const initialValues = {
    client: clientSelected,
    manager: managerSelected,
    codeProject: projectData?.codeProject,
    projectType: projectData?.projectType,
  }

  const { mutateAsync, isLoading: isSubmitting } = useMutation(updateProject, {
    onSuccess: () => {
      toast.success(
        'Los datos del proyecto han sido actualizados correctamente'
      )
      navigate(-1)
    },
    onError: error => errorHandler(error as AxiosError),
  })

  function onSubmit(values: ProjectFormTypes) {
    const { client, manager, ...restValues } = values

    const valuesConformed: any = {
      clientID: client._id,
      ...restValues,
    }
    if (manager?._id) valuesConformed.managerID = manager._id

    mutateAsync({ id, data: valuesConformed })
  }

  return (
    <div className="container mx-auto space-y-4 px-4 pb-4 pt-20 md:px-28">
      <Title title="Editar Proyecto" />
      <ProjectForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        isSubmitting={isSubmitting}
        managerOptions={managerOptions}
        clientOptions={clientOptions}
      />
    </div>
  )
}
