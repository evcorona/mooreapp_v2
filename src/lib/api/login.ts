import { AxiosError } from 'axios'
import { LoginData } from '../../types/objects'
import _ from 'lodash'
import api from './index'
import { errors } from '../../constants/errors'
import { routes } from './routes'
import { toast } from 'react-toastify'

export async function login(credentials: LoginData): Promise<any> {
  const response = await api.post(routes.login, credentials)

  return _.get(response, 'data.data.login')
}

export function errorHandler(error: AxiosError): void {
  if (!error.response) {
    toast.error(errors.api.network.message)
    return
  }

  switch (error.response?.status) {
    case errors.api.invalidData.status:
      toast.error(errors.api.invalidData.message)
      break
    case errors.api.revoked.status:
      toast.error(errors.api.revoked.message)
      break
    default:
      toast.error(errors.api.unknown.message)
      break
  }
}
