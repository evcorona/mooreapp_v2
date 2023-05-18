import Button from '~/components/Button'
import { CSVLink } from 'react-csv'
import { CollectionsDataType } from '~/types/objects'
import DateMonthPicker from './DateMonthPicker'
import SearchInput from '~/components/Inputs/SearchInput'
import clsx from 'clsx'
import format from 'date-fns/format'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

interface ToolsBarProps {
  data: CollectionsDataType[]
  placeholder: string
  startDate: Date
  isRefetching: boolean
  setStartDate: (date: Date) => void
  setSearchInput: (data: string) => void
}

export default function ToolsBar(props: ToolsBarProps) {
  const location = useLocation()

  const exportData = props.data.map(({ _id, isActive, ...data }) => data)
  const fileName = `mooreapp${location.pathname.replace('/', '_')}_${format(
    new Date(),
    'yyyyMMdd'
  )}.csv`

  const { register, handleSubmit } = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
    mode: 'onChange',
  })

  function onChange(e: any) {
    props.setSearchInput(e.target.value)
  }

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center justify-between gap-4',
        'sticky top-20 z-40',
        'shadow-lg backdrop-blur-sm',
        'rounded-md p-4'
      )}
    >
      <form className="flex-grow" onSubmit={handleSubmit(() => true)}>
        <SearchInput
          placeholder={`Buscar ${props.placeholder}`}
          onChange={onChange}
          register={register}
          isLoading={props.isRefetching}
        />
      </form>
      {location.pathname === '/activities' && (
        <DateMonthPicker
          startDate={props.startDate}
          setStartDate={props.setStartDate}
          isLoading={props.isRefetching}
        />
      )}
      <div className="btn-group w-full md:w-fit">
        <Button
          secondary
          className="btn-sm w-1/2 md:btn-md"
          isLoading={props.isRefetching}
        >
          <CSVLink filename={fileName} data={exportData}>
            Exportar
          </CSVLink>
        </Button>
        <Button primary className="btn-sm w-1/2 md:btn-md">
          Añadir
        </Button>
      </div>
    </div>
  )
}
