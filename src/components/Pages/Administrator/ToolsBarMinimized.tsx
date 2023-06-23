import Button from '~/components/Buttons/Button'
import { CSVLink } from 'react-csv'
import { CollectionsDataType } from '~/types/objects'
import SearchInput from '~/components/Inputs/SearchInput'
import _ from 'lodash'
import clsx from 'clsx'
import format from 'date-fns/format'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface ToolsBarProps {
  data: CollectionsDataType[]
  placeholder: string
  fileName: string
  setSearchInput: (data: string) => void
}

export default function ToolsBarMinimized(props: ToolsBarProps) {
  const exportData = props.data.map(({ _id, ...data }) => data)
  const fileName = `mooreapp-${props.fileName}-${format(
    new Date(),
    'yyyyMMdd'
  )}.csv`

  const { register, handleSubmit, getValues, reset } = useForm<{
    search: string
  }>({
    defaultValues: {
      search: '',
    },
    mode: 'onChange',
  })

  function onChange(e: any) {
    props.setSearchInput(e.target.value)
  }

  useEffect(() => reset(), [location.pathname])

  return (
    <div
      className={clsx(
        'flex flex-wrap',
        'items-center justify-between gap-4',
        'sticky top-20 z-40',
        'border bg-white/60 shadow-md backdrop-blur-sm',
        'rounded-md p-4'
      )}
    >
      <form className="flex-grow" onSubmit={handleSubmit(() => true)}>
        <SearchInput
          placeholder={`Buscar ${props.placeholder}`}
          onChange={onChange}
          register={register}
          value={getValues('search')}
        />
      </form>
      <Button
        secondary
        className="btn-sm w-full px-4 md:btn-md md:w-fit"
        isDisabled={_.isEmpty(props.data)}
      >
        <CSVLink filename={fileName} data={exportData}>
          Exportar
        </CSVLink>
      </Button>
    </div>
  )
}
