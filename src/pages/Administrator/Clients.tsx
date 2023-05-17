import { errorHandler, getAll } from '../../lib/api/clients'
import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import Button from '~/components/Button'
import { DB_SCHEMA } from '../../constants/businessConstants'
import { Link } from 'react-router-dom'
import SearchInput from '~/components/Inputs/SearchInput'
import _ from 'lodash'
import { useQuery } from 'react-query'

export default function Clients() {
  const [searchInput, setSearchInput] = useState('')
  const { data: allData = [], isLoading } = useQuery('clients', getAll, {
    onError: error => errorHandler(error as AxiosError),
    keepPreviousData: true,
  })
  const collectionProperties: [string, string][] = Object.entries(
    DB_SCHEMA.admin.clients
  )

  return (
    <div className="container mx-auto space-y-4 pt-20 px-4">
      <h1 className="text-black text-3xl font-semibold">Clientes</h1>
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          placeholder="Buscar cliente..."
          setSearchInput={setSearchInput}
        />
      </div>
    </div>
  )
}
