import { Link, useLocation } from 'react-router-dom'

import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'
import _ from 'lodash'

interface TableProps {
  headers: string[]
  properties: string[]
  data: CollectionsDataType[]
  details?: boolean
}

export default function Table(props: TableProps) {
  const location = useLocation()

  return (
    <div className="hidden overflow-x-auto rounded-md bg-white p-4 shadow-md lg:block">
      <table className="table-compact w-full">
        <thead className="border-b-4">
          <tr>
            <th className="text-start">#</th>
            {props.headers.map((header, i) => (
              <th key={`tableHeader-${i}`} className="text-start">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((data: any, i: number) => (
            <tr
              key={`row-${i}`}
              className="cursor-default border-b-2 hover:bg-gray-light hover:text-moore"
            >
              <td>{i + 1}</td>
              {props.properties.map((property, k) => {
                let value = data[property]
                if (property === 'timeAmmount') value = `${value} horas`
                if (property === 'fee')
                  value = `$ ${value.toLocaleString('es-MX', {
                    useGrouping: true,
                    minimumFractionDigits: 2,
                  })}`

                return (
                  <td className="whitespace-normal" key={`cell-${k}`}>
                    {value ?? (
                      <i className="rounded-full bg-alert-warning px-3 py-2 text-white">
                        Pendiente
                      </i>
                    )}
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
