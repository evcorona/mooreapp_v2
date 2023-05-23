import { headers, routes } from './routes'

import { AxiosError } from 'axios'
import { CollaboratorsData } from '~/types/objects'
import _ from 'lodash'
import api from './index'
import { errors } from '../../constants/errors'
import { toast } from 'react-toastify'

function formatData(users: any[]) {
  return users.map(user => {
    return {
      ...user,
      employmentDate: user.employmentDate.split('T')[0],
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

export function errorHandler(error: AxiosError): void {
  if (!error.response) {
    toast.error(errors.api.network.message)
    return
  }

  switch (error.response?.status) {
    case errors.api.duplicated.status:
      toast.error(errors.api.duplicated.message)
      break

    default:
      toast.error(errors.api.unknown.message)
      break
  }
  //TODO: handle unauthorized error

  return
}
