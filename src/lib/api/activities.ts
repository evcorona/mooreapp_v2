import { headers, routes } from './routes'

import { ActivitiesData } from '~/types/objects'
import { AxiosError } from 'axios'
import _ from 'lodash'
import api from './index'
import { errors } from '../../constants/errors'
import format from 'date-fns/format'
import { startOfMonth } from 'date-fns'
import { toast } from 'react-toastify'

function formatData(activities: any[]) {
  return activities.map(activity => {
    return {
      ...activity,
      activityDate: activity.activityDate.split('T')[0],
      client: activity.clientID?.clientName ?? activity.client,
      concept: activity?.projectID?.codeProject ?? activity.concept,
      feeFormatted:
        activity.fee &&
        `$ ${activity.fee.toLocaleString('es-MX', {
          useGrouping: true,
          minimumFractionDigits: 2,
        })}`,
      timeAmmountFormatted: `${activity.timeAmmount} horas`,
      createdBy: activity.userID
        ? `${activity.userID.name} ${activity.userID.lastName}`
        : activity.createdBy,
    }
  })
}

export async function getAll(startDate: Date): Promise<ActivitiesData[]> {
  const filterDate = startOfMonth(startDate ?? new Date())

  const filterDateFormatted = format(filterDate, 'yyyy-MM-dd')
  const routePlusQuery = routes.activities + filterDateFormatted

  const response = await api
    .get(routePlusQuery, headers)
    .catch(error => console.error(error))

  const data = _.get(response, 'data.data.activities', [])
  const formattedData = formatData(data)

  return formattedData
}

export async function getById(
  id: string,
  name: string | null,
  collection: 'client' | 'project' | 'collaborator'
): Promise<ActivitiesData[]> {
  const routePlusId = routes.activities + `${collection}/${id}/${name}`
  const response = await api
    .get(routePlusId, headers)
    .catch(error => console.error(error))

  const data = _.get(response, 'data.data.activities', [])
  const formattedData = formatData(data)

  return formattedData
}

export async function getMissingActivities(): Promise<string[]> {
  const response = await api
    .get(routes.activities + 'collaborator/missingActivities', headers)
    .catch(error => console.error(error))
  return _.get(response, 'data.data.activities', [])
}

export async function createActivity(
  data: ActivitiesData
): Promise<ActivitiesData[]> {
  const response = await api
    .post(routes.activities, data, headers)
    .catch(error => console.error(error))

  return _.get(response, 'data.data.activities', [])
}

export async function deleteById(id: string): Promise<void> {
  await api
    .delete(routes.activities + id, headers)
    .catch(error => console.error(error))

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
