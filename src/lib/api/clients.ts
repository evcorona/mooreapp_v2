import { headers, routes } from './routes'

import { AxiosError } from 'axios'
import { CLIENTS_DEFAULT_VALUES } from '~/constants/defaultValues'
import { ClientsData } from '~/types/objects'
import _ from 'lodash'
import api from './index'
import { errors } from '../../constants/errors'
import { toast } from 'react-toastify'

interface UpdateClientData {
  id: string
  data: ClientsData
}
export async function getAll(): Promise<ClientsData[]> {
  const response = await api
    .get(routes.clients, headers)
    .catch(error => console.error(error))

  return _.get(response, 'data.data.clients', [])
}

export async function getById(id: string): Promise<ClientsData> {
  const response = await api
    .get(routes.clients + id, headers)
    .catch(error => console.error(error))

  return _.get(response, 'data.data.client', CLIENTS_DEFAULT_VALUES)
}

export async function createClient(data: ClientsData): Promise<ClientsData> {
  const response = await api.post(routes.clients, data, headers)

  return _.get(response, 'data.data.client')
}

export async function updateClient(
  clientData: UpdateClientData
): Promise<ClientsData> {
  const { id, data } = clientData
  const response = await api.patch(routes.clients + id, data, headers)

  return _.get(response, 'data.data.client')
}

export async function deleteById(id: string): Promise<void> {
  await api.delete(routes.clients + id, headers)

  return
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
