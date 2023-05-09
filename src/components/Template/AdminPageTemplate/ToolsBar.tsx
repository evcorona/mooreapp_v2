import Button from '~/components/Button'
import { CollectionsDataType } from '~/types/objects'
import SearchInput from '~/components/Inputs/SearchInput'
import { exportToExcel } from 'react-json-to-excel'
import format from 'date-fns/format'

interface ToolsBarProps {
  setSearchInput: (data: string) => void
  data: CollectionsDataType[]
  placeholder: string
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

  return (
    <div className="flex justify-between items-center gap-4">
      <SearchInput
        placeholder={`Buscar ${props.placeholder}`}
        setSearchInput={props.setSearchInput}
      />
      <Button
        priority="secondary"
        className="bg-moore-dark"
        onClick={exportClients}
      >
        Exportar
      </Button>
      <Button priority="primary" className="bg-moore">
        Añadir
      </Button>
    </div>
  )
}
