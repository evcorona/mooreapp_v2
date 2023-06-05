import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import Cards from './Cards'
import { CollectionsDataType } from '~/types/objects'
import LoadingCard from '~/components/LoadingCard'
import NoResultsCard from './NoResultsCard'
import Table from './Table'
import Title from '../../Title'
import ToolsBar from './ToolsBar'
import _ from 'lodash'
import { errorHandler } from '../../../lib/api/clients'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'

interface AdminPageTemplateProps {
  title: string
  apiQuery: any
  headers: any[]
  searchPlaceholder: string
  details?: boolean
}

export default function AdminPageTemplate(props: AdminPageTemplateProps) {
  const [searchInput, setSearchInput] = useState<string>('')
  const [dataFiltered, setDataFiltered] = useState<any>([])
  const [startDate, setStartDate] = useState<Date>(new Date())
  const { pathname } = useLocation()

  const {
    data: allData = [],
    isLoading,
    isRefetching,
  } = useQuery([pathname, startDate], () => props.apiQuery(startDate), {
    onSuccess(data: CollectionsDataType[]) {
      !searchInput ? setDataFiltered(data) : filterData(data)
    },
    onError: error => errorHandler(error as AxiosError),
    keepPreviousData: true,
  })

  function filterData(dataToFilter: any[]) {
    let filterData = dataToFilter
    if (searchInput) {
      filterData = filterData.filter(data => {
        const searchBy = props.headers[0].accessor
        return data[searchBy].toLowerCase().includes(searchInput.toLowerCase())
      })
    }
    setDataFiltered(filterData)
  }

  useEffect(() => filterData(allData), [searchInput])

  useEffect(() => {
    setSearchInput('')
    setStartDate(new Date())
  }, [location.pathname])

  if (isLoading) {
    return (
      <div className="container mx-auto h-screen space-y-4 px-4 pt-20">
        <Title title={props.title} />
        <LoadingCard />
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-4 px-4 pt-20">
      <Title title={props.title} />
      <ToolsBar
        setSearchInput={setSearchInput}
        data={dataFiltered}
        placeholder={props.searchPlaceholder}
        startDate={startDate}
        setStartDate={setStartDate}
        isRefetching={isRefetching}
      />
      {_.isEmpty(dataFiltered) && <NoResultsCard />}
      {!_.isEmpty(dataFiltered) && (
        <>
          <Table
            headers={props.headers}
            data={dataFiltered}
            details={props.details}
          />
          <Cards
            headers={props.headers}
            data={dataFiltered}
            details={props.details}
            className="lg:hidden"
          />
        </>
      )}
    </div>
  )
}
