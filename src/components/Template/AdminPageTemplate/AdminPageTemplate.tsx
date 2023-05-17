import { QueryFunction, useQuery } from 'react-query'
import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import Cards from './Cards'
import { CollectionsDataType } from '~/types/objects'
import NoResultsCard from './NoResultsCard'
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
  searchPlaceholder: string
  details?: boolean
}

export default function AdminPageTemplate(props: AdminPageTemplateProps) {
  const [searchInput, setSearchInput] = useState<string>('')
  const [dataFiltered, setDataFiltered] = useState<any>([])
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const {
    data: allData = [],
    isLoading,
    isRefetching,
  } = useQuery(
    [props.routeBase, startDate],
    () => props.apiQuery({ startDate }),
    {
      onSuccess(data: CollectionsDataType[]) {
        if (!searchInput) setDataFiltered(data)
      },
      onError: error => errorHandler(error as AxiosError),
      keepPreviousData: true,
    }
  )

  const headers: string[] = Object.values(props.dbSchema)
  const properties: string[] = Object.keys(props.dbSchema)
  const collectionProperties: [string, string][] = Object.entries(
    props.dbSchema
  )

  function filterData() {
    let filterData: CollectionsDataType[] = allData
    if (searchInput) {
      filterData = filterData.filter((data: any) => {
        const searchBy: any = _.first(properties)
        return data[searchBy].toLowerCase().includes(searchInput.toLowerCase())
      })
    }
    setDataFiltered(filterData)
  }

  useEffect(() => filterData(), [searchInput])

  if (isLoading) {
    return (
      <div className="h-screen container mx-auto space-y-4 pt-20 px-4">
        <Title title={props.title} />
        <div className="animate-pulse h-16 bg-white/80" />
        <div className="animate-pulse h-96 bg-white/80 shadow-md" />
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-4 pt-20 px-4">
      <Title title={props.title} />
      <ToolsBar
        setSearchInput={setSearchInput}
        data={dataFiltered}
        placeholder={props.searchPlaceholder}
        startDate={startDate}
        setStartDate={setStartDate}
        isRefetching={isRefetching}
      />
      {searchInput && _.isEmpty(dataFiltered) ? (
        <NoResultsCard searchInput={searchInput} />
      ) : (
        <>
          <Table
            headers={headers}
            properties={properties}
            data={dataFiltered}
            details={props.details}
          />
          <Cards
            collectionProperties={collectionProperties}
            data={dataFiltered}
            details={props.details}
          />
        </>
      )}
    </div>
  )
}
