import Button from '~/components/Buttons/Button'
import { CollaboratorsData } from '~/types/objects'
import LoadingCard from '~/components/LoadingCard'
import { PlusIcon } from '@heroicons/react/24/outline'
import Title from '~/components/Title'
import _ from 'lodash'
import clsx from 'clsx'
import { es } from 'date-fns/locale'
import { format } from 'date-fns'
import { getMissingActivities } from '~/lib/api/activities'
import { getSelf } from '~/lib/api/collaborators'
import { useQuery } from 'react-query'
import { utcToZonedTime } from 'date-fns-tz'

export default function CollaboratorDashboard() {
  const { data } = useQuery<CollaboratorsData>(['selfActivities'], getSelf)
  const { data: missingActivities, isLoading } = useQuery<string[]>(
    ['missingActivities'],
    getMissingActivities
  )

  if (isLoading) {
    return (
      <div className="container mx-auto h-screen space-y-4 px-4 pt-20">
        <Title title="¡Bienvenido!" />
        <LoadingCard />
      </div>
    )
  }

  return (
    <div className="container mx-auto h-screen space-y-4 px-4 pt-20">
      <Title title="¡Bienvenido!" />
      <div className="flex cursor-default flex-col gap-4 md:flex-row">
        <div className="rounded-md border-r bg-white px-4 pb-4 text-center shadow-md">
          <figure
            className={clsx(
              'bg-personalData bg-contain bg-center bg-no-repeat',
              'h-24 w-full md:h-36'
            )}
          />
          <p className="whitespace-nowrap font-semibold text-moore">{`${data?.name} ${data?.lastName}`}</p>
          <p className="mb-2 text-sm italic text-gray-lighter">{`Colaborador #${data?.employeeNumber}`}</p>
          <div className="space-y-2 pt-4 text-sm">
            <p className="whitespace-nowrap">{`${data?.positionJob}`}</p>
            <p className="whitespace-nowrap">{`${data?.area}`}</p>
            <p className="whitespace-nowrap">{`${data?.email}`}</p>
            <p className="whitespace-nowrap">{`Fecha de inicio: ${data?.employmentDate}`}</p>
          </div>
        </div>
        {!isLoading && _.isEmpty(missingActivities) && (
          <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
            <figure className="h-40 w-full bg-wellDone bg-contain bg-center bg-no-repeat md:h-full" />
            <h1 className="text-xl font-bold">¡Bien hecho!</h1>
            <p className="text-lg">
              No tienes actividades pendientes de registrar
            </p>
          </div>
        )}
        {!_.isEmpty(missingActivities) && (
          <div className="flex-grow space-y-4 rounded-md bg-white p-4 shadow-md">
            <h2 className="text-lg font-semibold">Actividades faltantes</h2>
            {missingActivities?.map((date, i) => (
              <div
                className={clsx(
                  'flex items-center justify-between gap-2',
                  'rounded-md pl-2',
                  'capitalize',
                  'hover:bg-gray-light'
                )}
              >
                <p>{i + 1}</p>
                <p className="hidden whitespace-nowrap md:block">
                  {format(
                    utcToZonedTime(new Date(date), 'Greenwich'),
                    'EEEE dd, MMMM yyyy',
                    {
                      locale: es,
                    }
                  )}
                </p>
                <p className="whitespace-nowrap md:hidden">
                  {format(
                    utcToZonedTime(new Date(date), 'Greenwich'),
                    'E dd MMM yyyy',
                    {
                      locale: es,
                    }
                  )}
                </p>
                <Button primary className="btn-sm">
                  <PlusIcon className="w-5" />
                  Agregar
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
