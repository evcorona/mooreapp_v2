import Title from '~/components/Title'
import ToolsBar from '~/components/Template/AdminPageTemplate/ToolsBar'
import { useState } from 'react'

export default function Details() {
  const [searchInput, setSearchInput] = useState('')

  return (
    <div className="container mx-auto space-y-4 pt-20 px-4">
      <Title title={'detalles del cliente'} />
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <ToolsBar setSearchInput={setSearchInput} data={[]} placeholder={''} />
    </div>
  )
}
