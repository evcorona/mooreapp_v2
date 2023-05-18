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
      timeAmmount: `${activity.timeAmmount} horas`,
      fee: `$ ${activity.fee}`,
    }
  })
}
export async function getAll(query: any): Promise<ActivitiesData[]> {
  const filterDate = startOfMonth(query.startDate ?? new Date())

  const filterDateFormatted = format(filterDate, 'yyyy-MM-dd')
  const routePlusQuery = routes.activities + filterDateFormatted

  const response = await api
    .get(routePlusQuery, headers)
    .catch(error => console.error(error))

  const data = _.get(response, 'data.data.activities', [])
  const formattedData = formatData(data)

  return formattedData
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