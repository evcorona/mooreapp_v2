import {
  CollectionTopFiveInsights,
  GeneralInsights,
  TopFiveInsights,
} from '~/types/objects'
import {
  GENERAL_INSIGHTS_DEFAULT_VALUES,
  TOP_TEN_INSIGHTS_DEFAULT_VALUES,
} from '~/constants/defaultValues'
import {
  generalInsightsHeaders,
  topFiveInsightsHeaders,
} from '~/constants/dataHeaders/insightsHeaders'
import {
  getActivitiesDataForChart,
  getGeneralInsights,
  getTopFiveInsights,
} from '~/lib/api/insights'

import { Chart } from '~/components/Chart'
import DateRangePicker from '~/components/Inputs/DateRangePicker'
import LoadingCard from '~/components/LoadingCard'
import Title from '~/components/Title'
import _ from 'lodash'
import clsx from 'clsx'
import { subWeeks } from 'date-fns'
import { useQuery } from 'react-query'
import { useState } from 'react'

const startOfWeekAgo = subWeeks(new Date(), 1)

export default function Dashboard() {
  const [openAccordion, setOpenAccordion] = useState(0)
  const [startDate, setStartDate] = useState(startOfWeekAgo)
  const [endDate, setEndDate] = useState(new Date())

  const {
    data: generalInsights = GENERAL_INSIGHTS_DEFAULT_VALUES,
    isLoading: isGeneralInsightsLoading,
  } = useQuery('generalInsights', getGeneralInsights)

  const {
    data: topFiveInsights = TOP_TEN_INSIGHTS_DEFAULT_VALUES,
    isLoading: isTopFiveInsightsLoading,
    isRefetching,
  } = useQuery(['topFiveInsights', startDate, endDate], () =>
    getTopFiveInsights({ startDate, endDate })
  )

  const { data: chartData = [] } = useQuery(
    ['chartData', startDate, endDate],
    () => getActivitiesDataForChart({ startDate, endDate })
  )

  function resetPicker() {
    setStartDate(startOfWeekAgo)
    setEndDate(new Date())
  }

  if (isGeneralInsightsLoading) {
    return (
      <div className="container mx-auto h-screen space-y-4 px-4 pb-4 pt-20">
        <Title title="insights" />
        <LoadingCard />
      </div>
    )
  }

  const isActivitiesLoading = isTopFiveInsightsLoading

  return (
    <div className="container mx-auto h-screen cursor-default space-y-4 px-4 pb-4 pt-20">
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

      {/* DatePicker */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex-grow text-left text-3xl font-bold">Actividades</h1>
        <DateRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          resetPicker={resetPicker}
          isTodayMaxDate
          isClearable={startDate !== startOfWeekAgo}
          isLoading={isRefetching}
          className="md:w-72"
        />
      </div>

      {/* Main */}
      <div
        className={clsx(
          'grid-cols-[24rem_minmax(24rem,1fr)] gap-4 space-y-4 lg:grid'
        )}
      >
        <div className="lg:order-last">
          <Chart chartData={chartData} />
        </div>
        <div className="space-y-2 rounded-md border bg-white shadow-md lg:w-96">
          <h2 className="border-b bg-gray-light p-2 text-center">Top 5</h2>
          {topFiveInsightsHeaders.map((header, i) => {
            const topInsights =
              topFiveInsights[header.accessor as keyof TopFiveInsights]
            return (
              <div
                tabIndex={0}
                key={`cardTop-${i}`}
                className={clsx('collapse-arrow collapse', {
                  'collapse-open': openAccordion === i,
                })}
                onClick={() => setOpenAccordion(i)}
              >
                <p className="collapse-title font-bold">{header.header}</p>
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
                      <li
                        key={`topInsight-${j}${i}`}
                        className="p-2 hover:bg-gray-light hover:text-moore"
                      >
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
