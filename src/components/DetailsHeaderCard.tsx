import { InformationCircleIcon, PencilIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

import Button from './Button'
import { CollectionsDataType } from '~/types/objects'
import { Fragment } from 'react'
import clsx from 'clsx'

interface Props {
  data: CollectionsDataType
  dbSchema: any
  totals: { totalTime: string; totalCost: string }
}
export default function DetailsHeaderCard(props: Props) {
  const location = useLocation()

  const schema = {
    ...props.dbSchema,
    totalTime: 'Tiempo Acumulado',
    totalCost: 'Costo Acumulado',
  }
  const data = { ...props.data, ...props.totals }
  const collectionItems: [string, string][] = Object.entries(schema)

  return (
    <div className="cursor-default space-y-2 rounded-md bg-white p-4  text-xs shadow-lg md:text-base">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-full gap-3 font-bold">
          <InformationCircleIcon className="w-icon-sm text-gray" />
          Información
        </span>
        <Link to={`${location.pathname}/edit`}>
          <Button outline className="inline-flex items-center px-4 text-gray">
            <PencilIcon className="w-5" />
          </Button>
        </Link>
      </div>

      <div className="grid  grid-cols-3 items-center gap-1.5">
        {collectionItems.map((item, i) => {
          const [property, header] = item
          let value = data[property as keyof CollectionsDataType] ?? 0
          const isTotalField =
            property === 'totalTime' || property === 'totalCost'
          if (property === 'fee')
            value = `$ ${value.toLocaleString('es-MX', {
              useGrouping: true,
              minimumFractionDigits: 2,
            })}`

          return (
            <Fragment key={'details-' + i}>
              <span className="text-xs text-gray md:text-base">{header}</span>
              <span
                className={clsx('col-span-2 text-xs md:text-base', {
                  'font-semibold text-moore': isTotalField,
                })}
              >
                {!value || value === 0 ? (
                  <i className="rounded-full bg-alert-warning px-2 py-1 text-white">
                    Pendiente
                  </i>
                ) : (
                  value
                )}
              </span>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
