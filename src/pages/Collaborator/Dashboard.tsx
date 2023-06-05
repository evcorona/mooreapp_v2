import { format, isSameDay, isToday, startOfMonth } from 'date-fns'
import { useEffect, useState } from 'react'

import { ActivitiesData } from '~/types/objects'
import Button from '~/components/Button'
import Calendar from 'react-calendar'
import Cards from '~/components/Template/AdminPageTemplate/Cards'
import { ClockIcon } from '@heroicons/react/24/outline'
import NoResultsCard from '~/components/Template/AdminPageTemplate/NoResultsCard'
import { OnArgs } from 'react-calendar/dist/cjs/shared/types'
import Title from '~/components/Title'
import _ from 'lodash'
import activitiesHeaders from '~/constants/dataHeaders/activitiesHeaders'
import clsx from 'clsx'
import es from 'date-fns/locale/es'
import { getAll } from '~/lib/api/activities'
import { registerLocale } from 'react-datepicker'
import { useQuery } from 'react-query'

registerLocale('es', es)

const startOfCurrentMonth = startOfMonth(new Date())

export default function CollaboratorActivities() {
  const [daySelected, setDaySelected] = useState<Date>(new Date())
  const [monthSelected, setMonthSelected] = useState<Date>(startOfCurrentMonth)
  const [activitiesFiltered, setActivitiesFiltered] = useState<
    ActivitiesData[]
  >([])

  const { data: allActivities = [], isLoading } = useQuery(
    ['selfActivities', monthSelected],
    () => getAll(monthSelected)
  )

  function calendarNavigationHandler({ activeStartDate, view }: OnArgs) {
    if (view === 'month') {
      const startDate = activeStartDate ?? startOfCurrentMonth
      setMonthSelected(startDate)
      setDaySelected(startDate)
    }
  }

  function filterBySelectedDay() {
    const activities = allActivities.filter(activity => {
      const [daySelectedString] = daySelected.toISOString().split('T')
      return activity.activityDate.toString() === daySelectedString
    })
    setActivitiesFiltered(activities)
  }

  useEffect(() => filterBySelectedDay(), [daySelected])

  const totalTime = activitiesFiltered.reduce(
    (sum, activity) => sum + activity.timeAmmount,
    0
  )

  return (
    <div className="container mx-auto h-screen space-y-4 p-4 pt-20">
      <main className="grid h-full grid-rows-2 gap-4 md:grid-cols-2">
        <section
          className={clsx(
            'row-span-full',
            'flex flex-col',
            'justify-start gap-2'
          )}
        >
          <Title title="Actividades" />
          {totalTime > 0 && (
            <span
              className={clsx(
                'w-full rounded-md bg-moore px-4 py-1 font-bold',
                'flex gap-2',
                {
                  'bg-alert-success': totalTime > 8,
                  'bg-alert-warning': totalTime < 8,
                }
              )}
            >
              <ClockIcon className="w-5" />
              Total: {totalTime}
            </span>
          )}

          <div className="flex-grow overflow-y-auto pb-4">
            {_.isEmpty(activitiesFiltered) && (
              <NoResultsCard className="h-60" />
            )}
            {!_.isEmpty(activitiesFiltered) && (
              <Cards data={activitiesFiltered} headers={activitiesHeaders} />
            )}
          </div>
        </section>
        <section className="flex w-full flex-col items-start gap-4">
          <Calendar
            onChange={setDaySelected}
            onActiveStartDateChange={calendarNavigationHandler}
            showNeighboringMonth
            showYearNumbers
            value={daySelected}
            minDate={new Date('2021-01-02')}
            maxDate={new Date()}
            locale="es"
            minDetail="decade"
            className={clsx(
              'rounded-md border-gray-light shadow-md',
              'h-[21rem] w-full p-4',
              'calendar-activities'
            )}
          />
          <Button primary className="w-full">
            Agrega actividades
          </Button>
        </section>
      </main>
    </div>
  )
}
