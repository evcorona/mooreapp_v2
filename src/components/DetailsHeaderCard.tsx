import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

import Button from './Buttons/Button'
import { CollectionsDataType } from '~/types/objects'
import { Fragment } from 'react'
import clsx from 'clsx'

interface Props {
  data: CollectionsDataType
  headers: any[]
  setIsModalOpen: (open: boolean) => void
}
export default function DetailsHeaderCard(props: Props) {
  const location = useLocation()

  return (
    <div className="cursor-default space-y-2 rounded-md border bg-white p-4 text-xs shadow-md md:text-base">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-full items-center gap-3 font-bold">
          <InformationCircleIcon className="w-icon-sm text-gray" />
          Información
        </span>
        <div className="inline-flex w-full items-center justify-end gap-4">
          <div className="tooltip tooltip-bottom" data-tip="Eliminar">
            <Button
              outline="error"
              className="px-4 text-gray"
              onClick={() => props.setIsModalOpen(true)}
            >
              <TrashIcon className="w-icon-sm" />
            </Button>
          </div>
          <Link
            to={`${location.pathname}/edit`}
            className="tooltip tooltip-bottom"
            data-tip="Editar"
          >
            <Button outline="info" className="px-4 text-gray">
              <PencilIcon className="w-icon-sm" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-1.5">
        {props.headers.map((header, i) => {
          const { accessor } = header
          let value = props.data[accessor as keyof CollectionsDataType]
          const isTotalField =
            accessor === 'totalTime' || accessor === 'totalCost'

          return (
            <Fragment key={'details-' + i}>
              <span className="text-xs text-gray md:text-sm">
                {header.header}
              </span>
              <div className="col-span-2">
                <p
                  className={clsx('text-xs md:text-sm', {
                    'font-semibold text-moore': isTotalField,
                    'w-fit rounded-full bg-alert-warning px-2 py-1 text-white':
                      !value,
                  })}
                >
                  {!value ? 'Pendiente' : value}
                </p>
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
