import { headers, routes } from './routes'

import { ActivitiesData } from '~/types/objects'
import { AxiosError } from 'axios'
import _ from 'lodash'
import api from './index'
import { errors } from '../../constants/errors'
import { toast } from 'react-toastify'

export async function getAll(): Promise<ActivitiesData[]> {
  const response = await api
    .get(routes.activities, headers)
    .catch(error => console.error(error))

  return _.get(response, 'data.data.activities', [])
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
