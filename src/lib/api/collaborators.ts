import { headers, routes } from './routes'

import { AxiosError } from 'axios'
import { COLLABORATORS_DEFAULT_VALUES } from '~/constants/defaultValues'
import { CollaboratorsData } from '~/types/objects'
import _ from 'lodash'
import api from './index'
import { errors } from '../../constants/errors'
import { toast } from 'react-toastify'

interface UpdateCollaboratorData {
  id: string
  data: CollaboratorsData
}

function formatData(users: any[]) {
  return users.map(user => {
    return {
      ...user,
      employmentDate: user.employmentDate.split('T')[0],
      feeFormatted: `$ ${user.fee.toLocaleString('es-MX', {
        useGrouping: true,
        minimumFractionDigits: 2,
      })}`,
    }
  })
}

export async function getAll(): Promise<CollaboratorsData[]> {
  const response = await api
    .get(routes.collaborators, headers)
    .catch(error => console.error(error))

  const data = _.get(response, 'data.data.users', [])
  const formattedData = formatData(data)

  return formattedData
}

export async function getById(id: string): Promise<CollaboratorsData> {
  const response = await api
    .get(routes.collaborators + id, headers)
    .catch(error => console.error(error))

  const data = _.get(response, 'data.data.user', COLLABORATORS_DEFAULT_VALUES)
  const [formattedData] = formatData([data])

  return formattedData
}

export async function getManagers(): Promise<CollaboratorsData[]> {
  const response = await api
    .get(routes.collaborators + 'filter/managers', headers)
    .catch(error => console.error(error))

  const data = _.get(response, 'data.data.managers', [])
  const formattedData = formatData(data)

  return formattedData
}

export async function createCollaborator(
  data: CollaboratorsData
): Promise<void> {
  await api.post(routes.signup, data, headers)

  return
}

export async function updateCollaborator(
  collaboratorData: UpdateCollaboratorData
): Promise<CollaboratorsData> {
  const { id, data } = collaboratorData
  const response = await api.patch(routes.collaborators + id, data, headers)

  return _.get(response, 'data.data.collaborator')
}

export function errorHandler(error: AxiosError): void {
  if (!error.response) {
    toast.error(errors.api.network.message)
    return
  }

  switch (error.response?.status) {
    case errors.api.duplicated.status:
      toast.error(errors.api.duplicated.messageEmail)
      break

    default:
      toast.error(errors.api.unknown.message)
      break
  }
  //TODO: handle unauthorized error

  return
}
