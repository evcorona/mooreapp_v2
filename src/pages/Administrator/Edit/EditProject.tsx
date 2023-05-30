import { ClientsData, CollaboratorsData } from '~/types/objects'
import ProjectForm, { ProjectFormTypes } from '~/components/Forms/ProjectForm'
import {
  createProject,
  errorHandler,
  getById,
  updateProject,
} from '~/lib/api/projects'
import { useMutation, useQuery } from 'react-query'

import { AxiosError } from 'axios'
import Modal from '~/components/Modal'
import { PROJECTS_DEFAULT_VALUES } from '~/constants/defaultValues'
import Title from '~/components/Title'
import { getAll as getAllClients } from '../../../lib/api/clients'
import { getManagers } from '../../../lib/api/collaborators'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function EditProject() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const { id = '' } = useParams()

  const { data: projectData } = useQuery('project', () => getById(id))

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
  const managerOptions = allManagers.map(manager => {
    return { _id: manager._id, value: `${manager.name} ${manager.lastName}` }
  })

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

  const {
    mutateAsync,
    isLoading: isSubmitting,
    isSuccess,
  } = useMutation(updateProject, {
    onSuccess: () => {
      setIsModalOpen(true)
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
        <Title title="Editar proyecto" />
        <ProjectForm
          initialValues={initialValues}
          isSuccess={isSuccess}
          isSubmitting={isSubmitting}
          isClearable
          managerOptions={managerOptions}
          clientOptions={clientOptions}
          onSubmit={onSubmit}
        />
      </div>
    </>
  )
}
