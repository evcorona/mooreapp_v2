import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'
import SearchInput from '~/components/Inputs/SearchInput'
import clsx from 'clsx'
import { exportToExcel } from 'react-json-to-excel'
import format from 'date-fns/format'
import { useForm } from 'react-hook-form'

interface ToolsBarProps {
  setSearchInput: (data: string) => void
  data: CollectionsDataType[]
  placeholder: string
}

type FormData = {
  search: string
}

export default function ToolsBar(props: ToolsBarProps) {
  function exportClients() {
    const exportData = props.data.map(({ _id, isActive, ...data }) => data)
    const fileName = `mooreapp_${props.placeholder}_${format(
      new Date(),
      'yyyyMMdd'
    )}`
    exportToExcel(exportData, fileName)
  }

  const { register, handleSubmit } = useForm<FormData>({
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
        />
      </form>
      <div className="btn-group w-full md:w-fit">
        <Button
          secondary
          className="w-1/2 btn-sm md:btn-md"
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
