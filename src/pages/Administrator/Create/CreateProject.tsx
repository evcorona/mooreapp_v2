import { ClientsData, CollaboratorsData } from '~/types/objects'
import ProjectForm, { ProjectFormTypes } from '~/components/Forms/ProjectForm'
import { createProject, errorHandler } from '~/lib/api/projects'
import { useMutation, useQuery } from 'react-query'

import { AxiosError } from 'axios'
import Modal from '~/components/Modal'
import { PROJECTS_DEFAULT_VALUES } from '~/constants/defaultValues'
import Title from '~/components/Title'
import { getAll as getAllClients } from '~/lib/api/clients'
import { getManagers } from '~/lib/api/collaborators'
import { useState } from 'react'

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

  const {
    mutateAsync,
    isLoading: isSubmitting,
    isSuccess,
  } = useMutation(createProject, {
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
        El proyecto{' '}
        <span className="font-bold text-moore underline decoration-moore underline-offset-2">
          {name}
        </span>{' '}
        ha sido creado y esta disponible para la creación de actividades
      </Modal>
      <div className="container mx-auto space-y-4 px-4 pb-4 pt-20 md:px-28">
        <Title title="nuevo proyecto" />
        <ProjectForm
          initialValues={PROJECTS_DEFAULT_VALUES}
          isSuccess={isSuccess}
          isSubmitting={isSubmitting}
          isClearable
          managerOptions={managersOptions}
          clientOptions={clientOptions}
          onSubmit={onSubmit}
        />
      </div>
    </>
  )
}
