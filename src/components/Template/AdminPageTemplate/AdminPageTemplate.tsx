import { QueryFunction, useQuery } from 'react-query'
import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { CollectionsDataType } from '~/types/objects'
import Table from './Table'
import Title from '../../Title'
import ToolsBar from './ToolsBar'
import _ from 'lodash'
import { errorHandler } from '../../../lib/api/clients'

interface AdminPageTemplateProps {
  title: string
  routeBase: string
  apiQuery: QueryFunction
  dbSchema: any
}

export default function AdminPageTemplate(props: AdminPageTemplateProps) {
  const [searchInput, setSearchInput] = useState<string>('')
  const [dataFiltered, setDataFiltered] = useState<any>([])

  const { data: allData = [], isLoading } = useQuery(
    props.routeBase,
    props.apiQuery,
    {
      onSuccess(data: CollectionsDataType[]) {
        return data
      },
      onError: error => errorHandler(error as AxiosError),
      keepPreviousData: true,
    }
  )

  const headers: string[] = Object.values(props.dbSchema)
  const properties: string[] = Object.keys(props.dbSchema)

  function filterData() {
    let filterData: CollectionsDataType[] = allData
    if (searchInput) {
      filterData = filterData.filter((data: any) => {
        const searchBy: any = _.first(headers)
        return data[searchBy].toLowerCase().includes(searchInput.toLowerCase())
      })
    }
    setDataFiltered(filterData)
  }

  // useEffect(() => filterData(), [searchInput])
  useEffect(() => filterData(), [allData])

  if (isLoading) {
    return (
      <div className="h-screen container mx-auto space-y-4 pt-20 animate-pulse">
        <h1 className="text-black text-3xl font-semibold">Cargando...</h1>
        <div className="h-16 bg-white/80" />
        <div className="h-96 bg-white/80 shadow-md" />
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-4 pt-20">
      <Title title={props.title} />
      <ToolsBar
        setSearchInput={setSearchInput}
        data={allData}
        placeholder={props.title}
      />
      <Table
        headers={headers}
        properties={properties}
        data={dataFiltered}
        page={props.routeBase}
      />
    </div>
  )
}
