import { BriefcaseIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

import PersonalActivityForm from '~/components/Forms/PersonalActivityForm'
import ProfessionalActivityForm from '~/components/Forms/ProfessionalActivityForm'
import { Tab } from '@headlessui/react'

interface Props {
  date: string
  time: number
  setOpen: (open: boolean) => void
}

export default function CreateActivities(props: Props) {
  return (
    <div className="container mx-auto h-screen space-y-4 p-4">
      <div className="flex items-center gap-2 text-alert-success">
        <ClockIcon className="w-5" />
        <span className="font-bold">Total registrado:</span> {props.time} horas
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
              <ProfessionalActivityForm
                date={props.date}
                setOpen={props.setOpen}
              />
            </Tab.Panel>
            <Tab.Panel>
              <PersonalActivityForm date={props.date} setOpen={props.setOpen} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
