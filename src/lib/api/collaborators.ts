import { headers, routes } from './routes'

import { AxiosError } from 'axios'
import { CollaboratorsData } from '~/types/objects'
import _ from 'lodash'
import api from './index'
import { errors } from '../../constants/errors'
import { toast } from 'react-toastify'

export async function getAll(): Promise<CollaboratorsData[]> {
  const response = await api
    .get(routes.collaborators, headers)
    .catch(error => console.error(error))

  return _.get(response, 'data.data.collaborators', [])
}

export function errorHandler(error: AxiosError): void {
  if (!error.response) {
    toast.error(errors.api.network.message)
    return
  }

  //TODO: handle unauthorized error

  toast.error(errors.api.unknown.message)
  return
}
