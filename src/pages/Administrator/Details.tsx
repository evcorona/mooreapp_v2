import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { ActivitiesData } from '~/types/objects'
import Cards from '~/components/Template/AdminPageTemplate/Cards'
import { DB_SCHEMA } from '~/constants/businessConstants'
import DetailsHeaderCard from '~/components/DetailsHeaderCard'
import LoadingCard from '~/components/LoadingCard'
import NoResultsCard from '~/components/Template/AdminPageTemplate/NoResultsCard'
import Table from '~/components/Template/AdminPageTemplate/Table'
import Title from '~/components/Title'
import ToolsBarMinimized from '~/components/Template/AdminPageTemplate/ToolsBarMinimized'
import _ from 'lodash'
import getActivitiesTotals from '~/utils/getActivitiesTotals'
import { getById } from '~/lib/api/activities'
import { useQuery } from 'react-query'

interface DetailsProps {
  title: string
  apiQuery: any
  dbSchema: any
  collection: 'client' | 'project' | 'collaborator'
}

export default function Details(props: DetailsProps) {
  const [searchInput, setSearchInput] = useState('')
  const [dataFiltered, setDataFiltered] = useState<any>([])
  const [totals, setTotals] = useState({
    totalTime: '0 horas',
    totalCost: '$ 0.00',
  })
  const [fileName, setFileName] = useState('')
  const { id } = useParams()
  const location = useLocation()

  const name =
    props.collection === 'client'
      ? 'clientName'
      : props.collection === 'project'
      ? 'codeProject'
      : 'email'
  const headers: string[] = Object.values(DB_SCHEMA.admin.activities)
  const properties: string[] = Object.keys(DB_SCHEMA.admin.activities)
  const collectionProperties: [string, string][] = Object.entries(
    DB_SCHEMA.admin.activities
  )

  const { data: selfData = [], isLoading: isSelfLoading } = useQuery(
    location.pathname,
    () => props.apiQuery(id)
  )

  const { data: allData = [], isLoading: isAllDataLoading } = useQuery({
    queryKey: ['activitiesBy', props.collection],
    queryFn: () => getById(selfData._id, selfData[name], props.collection),
    enabled: Boolean(selfData?._id)!!,
    onSuccess(data: ActivitiesData[]) {
      setFileName(
        `${props.collection}-details-${selfData[name]
          .toLowerCase()
          .replaceAll(' ', '_')}`
      )
      setTotals(getActivitiesTotals(data))
      !searchInput ? setDataFiltered(data) : filterData(data)
    },
    keepPreviousData: true,
  })

  function filterData(dataToFilter: any[]) {
    let filterData = dataToFilter
    if (searchInput) {
      filterData = filterData.filter(data => {
        const searchBy: any = _.first(properties)
        return data[searchBy].toLowerCase().includes(searchInput.toLowerCase())
      })
    }
    setDataFiltered(filterData)
  }

  useEffect(() => filterData(allData), [searchInput])

  useEffect(() => {
    setSearchInput('')
  }, [location.pathname])

  if (isSelfLoading || isAllDataLoading) {
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
      <DetailsHeaderCard
        data={selfData}
        dbSchema={props.dbSchema}
        totals={totals}
      />
      <ToolsBarMinimized
        setSearchInput={setSearchInput}
        data={dataFiltered}
        placeholder="por colaborador..."
        fileName={fileName}
      />
      {_.isEmpty(dataFiltered) && <NoResultsCard />}
      {!_.isEmpty(dataFiltered) && (
        <>
          <Table
            headers={headers}
            properties={properties}
            data={dataFiltered}
          />
          <Cards
            collectionProperties={collectionProperties}
            data={dataFiltered}
          />
        </>
      )}
    </div>
  )
}
