import { Link, useLocation } from 'react-router-dom'

import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'
import _ from 'lodash'
import clsx from 'clsx'

interface TableProps {
  headers: any[]
  data: CollectionsDataType[]
  details?: boolean
}

export default function Table(props: TableProps) {
  const location = useLocation()

  return (
    <div className="hidden overflow-x-auto rounded-md border bg-white p-4 shadow-md lg:block">
      <table className="table-compact w-full text-sm">
        <thead className="border-b-4">
          <tr>
            <th className="px-6 text-center">#</th>
            {props.headers.map(
              (header, i) =>
                !header.hideInOverview && (
                  <th key={`tableHeader-${i}`} className="px-6 text-center">
                    {header.header}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {props.data.map((data: any, i: number) => (
            <tr
              key={`row-${i}`}
              className="cursor-default border-b-2 text-center hover:bg-gray-light hover:text-moore"
            >
              <td>{i + 1}</td>
              {props.headers.map((header, k) => {
                let value = data[header.accessor]

                return (
                  <td className={header.className} key={`cell-${k}`}>
                    <p
                      className={clsx({
                        'm-auto w-fit rounded-full bg-alert-warning px-2 py-1 text-white':
                          !value,
                      })}
                    >
                      {!value ? 'Pendiente' : value}
                    </p>
                  </td>
                )
              })}
              {props.details && (
                <td className="pl-10">
                  <Link to={`${location.pathname}/${data._id}`}>
                    <Button className="btn-sm bg-gray-lighter">Detalles</Button>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
