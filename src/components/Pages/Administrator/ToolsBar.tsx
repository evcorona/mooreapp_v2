import { useLocation, useNavigate } from 'react-router-dom'

import Button from '~/components/Buttons/Button'
import { CSVLink } from 'react-csv'
import { CollectionsDataType } from '~/types/objects'
import DateMonthPicker from '../../Inputs/DateMonthPicker'
import SearchInput from '~/components/Inputs/SearchInput'
import _ from 'lodash'
import clsx from 'clsx'
import format from 'date-fns/format'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
  const navigate = useNavigate()

  const exportData = props.data.map(({ _id, ...data }) => data)
  const fileName = `mooreapp${location.pathname.replace('/', '_')}_${format(
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
      <div className="join w-full md:w-fit">
        <div
          className={clsx('join-item w-1/2', {
            'w-full': location.pathname === '/activities',
          })}
        >
          <CSVLink filename={fileName} data={exportData}>
            <Button
              secondary
              className="btn-sm w-full md:btn-md"
              isLoading={props.isRefetching}
              isDisabled={_.isEmpty(props.data)}
            >
              Exportar
            </Button>
          </CSVLink>
        </div>
        {location.pathname !== '/activities' && (
          <Button
            primary
            className="btn-sm join-item w-1/2 md:btn-md"
            onClick={() => navigate(`${location.pathname}/create`)}
          >
            Añadir
          </Button>
        )}
      </div>
    </div>
  )
}
