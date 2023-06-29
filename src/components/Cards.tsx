import { Link, useLocation } from 'react-router-dom'

import Button from '~/components/Buttons/Button'
import { CollectionsDataType } from '~/types/objects'
import DeleteButton from '~/components/Buttons/DeleteButton'
import clsx from 'clsx'

interface CardsProps {
  data: CollectionsDataType[]
  headers: any
  details?: boolean
  className?: string
  deleteButton?: boolean
  isCollaboratorView?: boolean
  collection?: 'clients' | 'projects' | 'collaborators'
  refetch?: () => void
  setIdSelected?: (id: any) => void
}
export default function Cards(props: CardsProps) {
  const [firstHeader, ...headers] = props.headers

  const location = useLocation()

  return (
    <div className={clsx('space-y-4', props.className)}>
      {props.data.map((data, i) => {
        const titleCard =
          data[firstHeader.accessor as keyof CollectionsDataType]

        return (
          <div
            key={'card-' + i}
            className="border-xl card card-compact w-full cursor-default bg-white shadow-md hover:bg-gray-light hover:text-moore"
          >
            <div className="card-body flex">
              <div className="card-title flex justify-between">
                <h2 className="text-sm">{titleCard}</h2>
                {props.deleteButton && (
                  <div className="card-actions justify-end">
                    <DeleteButton
                      collection={props.collection ?? 'activities'}
                      data={data}
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      refetch={props.refetch ?? function () {}}
                    />
                  </div>
                )}
              </div>

              {headers.map((header: any, k: number) => {
                const value = data[header.accessor as keyof CollectionsDataType]

                if (props.isCollaboratorView && header.hideForCollaborator)
                  return

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
                    <Button primary className="btn-sm bg-gray-lighter">
                      Detalles
                    </Button>
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
