import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'
import { Link } from 'react-router-dom'

interface TableProps {
  headers: string[]
  properties: string[]
  data: CollectionsDataType[]
  page: string
}

export default function Table(props: TableProps) {
  return (
    <div className="hidden lg:block overflow-x-auto shadow-md p-4 rounded-md bg-white">
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
              className="border-b-2 hover:bg-gray-light hover:text-moore cursor-default"
            >
              <td>{i + 1}</td>
              {props.properties.map((property, k) => {
                const value = data[property]

                return (
                  <td className="whitespace-normal" key={`cell-${k}`}>
                    {value ?? (
                      <i className="bg-alert-warning rounded-full px-3 py-2 text-white">
                        Pendiente
                      </i>
                    )}
                  </td>
                )
              })}
              <td className="pl-10">
                <Link to={`/${props.page}/${data._id}`}>
                  <Button className="bg-gray-lighter text-white">
                    Detalles
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
