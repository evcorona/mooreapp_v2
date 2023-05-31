import { Link, useLocation } from 'react-router-dom'

import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'

interface CardsProps {
  data: CollectionsDataType[]
  collectionProperties: any
  details?: boolean
}
export default function Cards(props: CardsProps) {
  const [firstProperty, ...collectionProperties] = props.collectionProperties
  const [firstKey] = firstProperty

  const location = useLocation()

  return (
    <div className="space-y-4 lg:hidden">
      {props.data.map((data, i) => {
        const titleCard = data[firstKey as keyof CollectionsDataType]
        return (
          <div
            key={'card-' + i}
            className="card-compact card w-full cursor-default bg-base-100 shadow-xl hover:bg-gray-light hover:text-moore"
          >
            <div className="card-body flex">
              <h2 className="card-title border-b-2 px-2 text-sm">{`${titleCard}`}</h2>
              {collectionProperties.map((property: any, k: number) => {
                const [key, header] = property
                let value = data[key as keyof CollectionsDataType]

                return (
                  <div key={'cardBody-' + k}>
                    <p className="text-xs">
                      <span className="font-semibold">{`${header}: `}</span>
                      {!value ? (
                        <i className="rounded-full bg-alert-warning px-2 py-1 text-white">
                          Pendiente
                        </i>
                      ) : (
                        value
                      )}
                    </p>
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
