import {
  DateRangeData,
  GeneralInsights,
  TopFiveInsights,
} from '~/types/objects'
import {
  GENERAL_INSIGHTS_DEFAULT_VALUES,
  TOP_TEN_INSIGHTS_DEFAULT_VALUES,
} from '~/constants/defaultValues'
import { headers, routes } from '~/lib/api/routes'

import { AxiosError } from 'axios'
import _ from 'lodash'
import api from '~/lib/api/index'
import { errors } from '../../constants/errors'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

export async function getGeneralInsights(): Promise<GeneralInsights> {
  const response = await api
    .get(routes.insights, headers)
    .catch(error => console.error(error))

  return _.get(response, 'data.data.insights', GENERAL_INSIGHTS_DEFAULT_VALUES)
}

export async function getTopFiveInsights(
  dateRange: DateRangeData
): Promise<TopFiveInsights> {
  const startDate = format(dateRange.startDate, 'yyyy-MM-dd')
  const endDate = format(dateRange.endDate, 'yyyy-MM-dd')
  const dateRangeQuery = `topFive/${startDate}/${endDate}`

  const response = await api
    .get(routes.insights + dateRangeQuery, headers)
    .catch(error => console.error(error))

  return _.get(response, 'data.data.insights', TOP_TEN_INSIGHTS_DEFAULT_VALUES)
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
