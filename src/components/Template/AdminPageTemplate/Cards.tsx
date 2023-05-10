import { Link, useLocation } from 'react-router-dom'

import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'

interface CardsProps {
  data: CollectionsDataType[]
  collectionProperties: [string, string][]
  details?: boolean
}
export default function Cards(props: CardsProps) {
  const location = useLocation()
  return (
    <div className="lg:hidden space-y-4">
      {props.data.map((data, i) => {
        return (
          <div
            key={'card-' + i}
            className="card card-compact w-full bg-base-100 shadow-xl hover:bg-gray-light hover:text-moore cursor-default"
          >
            <div className="card-body flex">
              {props.collectionProperties.map((property, k) => {
                const [key, header] = property
                const value = data[key]

                return (
                  <div key={'cardBody-' + k}>
                    {k == 0 ? (
                      <h2 className="card-title border-b-2 px-2 text-sm">{`${value}`}</h2>
                    ) : (
                      <p className="text-xs">
                        <span className="font-semibold">{`${header}: `}</span>
                        {value}
                      </p>
                    )}
                  </div>
                )
              })}
              {props.details && (
                <div className="card-actions justify-end">
                  <Link to={`${location.pathname}/${data._id}`}>
                    <Button className="bg-gray-lighter btn-sm">Detalles</Button>
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
