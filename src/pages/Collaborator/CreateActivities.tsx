import { BriefcaseIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

import ProfessionalActivityForm from '~/components/Forms/ProfessionalActivityForm'
import { Tab } from '@headlessui/react'
import Title from '~/components/Title'
import { useParams } from 'react-router-dom'

export default function CreateActivities() {
  const params = useParams()

  console.log(params)

  return (
    <div className="container mx-auto h-screen space-y-4 p-4 pt-20">
      <div className="flex justify-between">
        <Title title="Agregar actividad" />
        <p className="text-2xl font-bold">2023/05/05</p>
      </div>
      <div className="flex items-center gap-4 text-alert-success">
        <ClockIcon className="w-5" />
        <span className="font-bold">Total registrado:</span> 0 horas
      </div>
      <div>
        <Tab.Group>
          <Tab.List className="join join-horizontal w-full border border-moore bg-white">
            <Tab className="join-item flex w-full items-center justify-center gap-4 p-2 text-moore focus:bg-moore focus:text-white focus:outline-none">
              <BriefcaseIcon className="w-5" />
              Profesional
            </Tab>
            <Tab className="join-item flex w-full items-center justify-center gap-4 p-2 text-moore focus:bg-moore focus:text-white focus:outline-none">
              <UserIcon className="w-5" />
              Personal
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-4 rounded-md border bg-white shadow-md">
            <Tab.Panel>
              <ProfessionalActivityForm />
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
