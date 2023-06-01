import {
  CollectionTopFiveInsights,
  GeneralInsights,
  TopFiveInsights,
} from '~/types/objects'
import DatePicker, { registerLocale } from 'react-datepicker'
import {
  GENERAL_INSIGHTS_DEFAULT_VALUES,
  TOP_TEN_INSIGHTS_DEFAULT_VALUES,
} from '~/constants/defaultValues'
import {
  generalInsightsHeaders,
  topFiveInsightsHeaders,
} from '~/constants/dataHeaders/insightsHeaders'
import { getGeneralInsights, getTopFiveInsights } from '~/lib/api/insights'

import LoadingCard from '~/components/LoadingCard'
import Title from '~/components/Title'
import clsx from 'clsx'
import es from 'date-fns/locale/es'
import { useQuery } from 'react-query'
import { useState } from 'react'

registerLocale('es', es)

export default function Dashboard() {
  const [openAccordion, setOpenAccordion] = useState(0)
  const [rangeDates, setRangeDates] = useState({
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-01-31'),
  })
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  const {
    data: generalInsights = GENERAL_INSIGHTS_DEFAULT_VALUES,
    isLoading: isGeneralInsightsLoading,
  } = useQuery('generalInsights', getGeneralInsights)

  const {
    data: topFiveInsights = TOP_TEN_INSIGHTS_DEFAULT_VALUES,
    isLoading: isTopFiveInsightsLoading,
  } = useQuery('topFiveInsights', () => getTopFiveInsights(rangeDates))

  if (isGeneralInsightsLoading || isTopFiveInsightsLoading) {
    return (
      <div className="container mx-auto h-screen space-y-4 px-4 pt-20">
        <Title title="insights" />
        <LoadingCard />
      </div>
    )
  }

  return (
    <div className="container mx-auto h-screen cursor-default space-y-4 px-4 pt-20">
      <div className="stats stats-horizontal w-full rounded-md border bg-white text-center shadow-md">
        {generalInsightsHeaders.map((header, i) => {
          const value =
            generalInsights[header.accessor as keyof GeneralInsights]
          return (
            <div key={`gralInsight-${i}`} className="group stat">
              <p className="stat-value group-hover:text-moore">
                {value.toLocaleString()}
              </p>
              <p className="stat-title group-hover:text-moore">
                {header.header}
              </p>
            </div>
          )
        })}
      </div>
      <div className="flex gap-8">
        <div className="w-full flex-grow">
          Actividades
          <DatePicker
            showIcon
            dateFormat="MMMM/yyyy"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            locale="es"
            placeholderText="Filtrar por fecha"
            todayButton="Hoy"
            onChange={update => {
              setDateRange(update)
            }}
            isClearable={true}
          />
        </div>
        <div className="space-y-2 rounded-md border bg-white shadow-md">
          <h2 className="border-b bg-gray-light p-4 text-center">Top 5</h2>
          {topFiveInsightsHeaders.map((header, i) => {
            const topInsights =
              topFiveInsights[header.accessor as keyof TopFiveInsights]
            return (
              <div
                tabIndex={0}
                key={`cardTop-${i}`}
                className={clsx('collapse-plus collapse', {
                  'collapse-open': openAccordion === i,
                })}
                onClick={() => setOpenAccordion(i)}
              >
                <p className="collapse-title text-xl font-bold">
                  {header.header}
                </p>
                <ul className="group collapse-content list-inside list-decimal text-sm">
                  {topInsights.map((insight, j) => {
                    let value: any =
                      insight[
                        header.subAccessor as keyof CollectionTopFiveInsights
                      ]

                    const totalCost = `$ ${insight.totalCost.toLocaleString(
                      'es-MX',
                      {
                        useGrouping: true,
                        minimumFractionDigits: 2,
                      }
                    )}`
                    const totalTime = `${insight.totalTime} horas`

                    if (Array.isArray(header.subAccessor)) {
                      const [first, second] = header.subAccessor
                      value = `${
                        insight[first as keyof CollectionTopFiveInsights]
                      } ${insight[second as keyof CollectionTopFiveInsights]}`
                    }

                    return (
                      <li className="p-2 hover:bg-gray-light hover:text-moore">
                        {value}
                        <div className="flex gap-4 text-xs text-gray ">
                          <i className="whitespace-nowrap">
                            Costo: {totalCost}
                          </i>
                          <i className="whitespace-nowrap">
                            Tiempo: {totalTime}
                          </i>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
