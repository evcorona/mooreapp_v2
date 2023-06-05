import { Link, useLocation } from 'react-router-dom'

import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'
import clsx from 'clsx'

interface CardsProps {
  data: CollectionsDataType[]
  headers: any
  details?: boolean
}
export default function Cards(props: CardsProps) {
  const [firstHeader, ...headers] = props.headers

  const location = useLocation()

  return (
    <div className="space-y-4 lg:hidden">
      {props.data.map((data, i) => {
        const titleCard =
          data[firstHeader.accessor as keyof CollectionsDataType]
        return (
          <div
            key={'card-' + i}
            className="card card-compact w-full cursor-default bg-base-100 shadow-xl hover:bg-gray-light hover:text-moore"
          >
            <div className="card-body flex">
              <h2 className="card-title border-b-2 px-2 text-sm">{`${titleCard}`}</h2>
              {headers.map((header: any, k: number) => {
                let value = data[header.accessor as keyof CollectionsDataType]

                return (
                  <div key={'cardBody-' + k}>
                    <div className="grid grid-cols-3 text-xs">
                      <span className="text-xs text-gray">{header.header}</span>
                      <div className="col-span-2">
                        <p
                          className={clsx({
                            'w-fit rounded-full bg-alert-warning px-2 py-1 text-white':
                              !value,
                          })}
                        >
                          {!value ? 'Pendiente' : value}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              {props.details && (
                <div className="card-actions justify-end">
                  <Link to={`${location.pathname}/${data._id}`}>
                    <Button className="btn-sm bg-gray-lighter">Detalles</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
