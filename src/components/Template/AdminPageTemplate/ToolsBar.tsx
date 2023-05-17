import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'
import DateMonthPicker from './DateMonthPicker'
import SearchInput from '~/components/Inputs/SearchInput'
import clsx from 'clsx'
import { exportToExcel } from 'react-json-to-excel'
import format from 'date-fns/format'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

interface ToolsBarProps {
  data: CollectionsDataType[]
  placeholder: string
  startDate: Date | null
  isRefetching: boolean
  setStartDate: (date: Date | null) => void
  setSearchInput: (data: string) => void
}

export default function ToolsBar(props: ToolsBarProps) {
  const location = useLocation()

  function exportClients() {
    const exportData = props.data.map(({ _id, isActive, ...data }) => data)
    const fileName = `mooreapp_${props.placeholder}_${format(
      new Date(),
      'yyyyMMdd'
    )}`
    exportToExcel(exportData, fileName)
  }

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
        'flex-wrap flex justify-between items-center gap-4',
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
          className="w-1/2 btn-sm md:btn-md"
          isLoading={props.isRefetching}
          onClick={exportClients}
        >
          Exportar
        </Button>
        <Button primary className="w-1/2 btn-sm md:btn-md">
          Añadir
        </Button>
      </div>
    </div>
  )
}
