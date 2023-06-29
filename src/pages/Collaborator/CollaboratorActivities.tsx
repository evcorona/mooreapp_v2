import { ClockIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

import { ActivitiesData } from '~/types/objects'
import Button from '~/components/Buttons/Button'
import Calendar from 'react-calendar'
import Cards from '~/components/Cards'
import CreateActivities from '~/components/Pages/Collaborator/CreateActivities'
import LoadingCard from '~/components/LoadingCard'
import NoResultsCard from '~/components/NoResultsCard'
import { OnArgs } from 'react-calendar/dist/cjs/shared/types'
import SlideOver from '~/components/SlideOver'
import Title from '~/components/Title'
import _ from 'lodash'
import activitiesHeaders from '~/constants/dataHeaders/activitiesHeaders'
import clsx from 'clsx'
import es from 'date-fns/locale/es'
import { getAll } from '~/lib/api/activities'
import { registerLocale } from 'react-datepicker'
import { startOfMonth } from 'date-fns'
import { useQuery } from 'react-query'

registerLocale('es', es)

const startOfCurrentMonth = startOfMonth(new Date())

export default function CollaboratorActivities() {
  const [openSlideOver, setOpenSlideOver] = useState(false)
  const [daySelected, setDaySelected] = useState<any>(new Date())
  const [monthSelected, setMonthSelected] = useState<Date>(startOfCurrentMonth)
  const [activitiesFiltered, setActivitiesFiltered] = useState<
    ActivitiesData[]
  >([])

  const {
    data: allActivities = [],
    isLoading,
    refetch,
  } = useQuery<ActivitiesData[]>({
    queryKey: ['selfActivities', monthSelected],
    queryFn: () => getAll(monthSelected),
    onSuccess(data) {
      filterBySelectedDay(data)
    },
  })

  const [daySelectedString] = daySelected.toISOString().split('T')
  const totalTimePerDay = activitiesFiltered.reduce(
    (sum, activity) => sum + activity.timeAmmount,
    0
  )

  function calendarNavigationHandler({ activeStartDate, view }: OnArgs) {
    if (view === 'month') {
      const startDate = activeStartDate ?? startOfCurrentMonth
      setMonthSelected(startDate)
      setDaySelected(startDate)
    }
  }

  function filterBySelectedDay(data: ActivitiesData[] = []) {
    const activitiesToFilter = data.length > 0 ? data : allActivities

    const activities = activitiesToFilter.filter(activity => {
      return activity.activityDate.toString() === daySelectedString
    })
    setActivitiesFiltered(activities)
  }

  function openHandler(value: boolean) {
    refetch()
    setOpenSlideOver(value)
  }

  useEffect(() => filterBySelectedDay(), [daySelected])

  return (
    <>
      {isLoading && <LoadingCard />}
      <SlideOver
        open={openSlideOver}
        setOpen={setOpenSlideOver}
        title="Crear actividad"
      >
        <CreateActivities
          date={daySelectedString}
          time={totalTimePerDay}
          setOpen={openHandler}
        />
      </SlideOver>
      <div className="container mx-auto h-screen space-y-4 p-4 pb-4 pt-20">
        <main className="grid h-full grid-rows-2 gap-4 md:grid-cols-2">
          <section
            className={clsx(
              'row-span-full',
              'flex flex-col',
              'justify-start gap-4'
            )}
          >
            <Title title="Actividades" />
            <div className="flex-grow overflow-y-auto pb-4">
              {_.isEmpty(activitiesFiltered) && (
                <NoResultsCard className="h-60" />
              )}
              {!_.isEmpty(activitiesFiltered) && (
                <div className="flex flex-col gap-4 md:flex-col-reverse">
                  <span
                    className={clsx(
                      'w-full py-1',
                      'flex items-center',
                      'font-bold',
                      'flex gap-2',
                      {
                        'text-alert-success': totalTimePerDay >= 8,
                        'text-alert-warning ': totalTimePerDay < 8,
                      }
                    )}
                  >
                    <ClockIcon className="w-5" />
                    Total: {totalTimePerDay} horas
                  </span>
                  <Cards
                    data={activitiesFiltered}
                    headers={activitiesHeaders}
                    refetch={refetch}
                    isCollaboratorView
                    deleteButton
                  />
                </div>
              )}
            </div>
          </section>
          <section className="flex w-full flex-col items-start gap-4 md:pt-12">
            <Calendar
              onChange={setDaySelected}
              onActiveStartDateChange={calendarNavigationHandler}
              showNeighboringMonth
              value={daySelected}
              minDate={new Date('2021-01-02')}
              maxDate={new Date()}
              locale="es"
              minDetail="decade"
              className={clsx(
                'rounded-md border-gray-light shadow-md',
                'w-full p-4',
                'calendar-activities'
              )}
            />
            <Button
              primary
              className="w-full"
              onClick={() => setOpenSlideOver(true)}
            >
              <PlusIcon className="w-5" />
              Agregar actividad
            </Button>
          </section>
        </main>
      </div>
    </>
  )
}
