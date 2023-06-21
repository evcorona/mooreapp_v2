import { BriefcaseIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

import PersonalActivityForm from '~/components/Forms/PersonalActivityForm'
import ProfessionalActivityForm from '~/components/Forms/ProfessionalActivityForm'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

interface Props {
  date: string
  time: number
  setOpen: (open: boolean) => void
}

export default function CreateActivities(props: Props) {
  return (
    <Tab.Group as="div" className="container mx-auto h-full space-y-6 pb-4">
      <Tab.List className="join join-horizontal h-20 w-full border border-moore bg-white">
        <Tab
          className={clsx(
            'btn font-bold tracking-wide',
            'join-item h-full w-1/2',
            'flex flex-col items-center justify-center gap-2 md:flex-row',
            'ui-selected:bg-moore ui-selected:text-white ui-selected:outline-none',
            'ui-not-selected:bg-white ui-not-selected:text-moore'
          )}
        >
          <BriefcaseIcon className="w-5" />
          Profesional
        </Tab>
        <Tab
          className={clsx(
            'btn font-bold tracking-wide',
            'join-item h-full w-1/2',
            'flex flex-col items-center justify-center gap-2 md:flex-row',
            'ui-selected:bg-moore ui-selected:text-white ui-selected:outline-none',
            'ui-not-selected:bg-white ui-not-selected:text-moore'
          )}
        >
          <UserIcon className="w-5" />
          Personal
        </Tab>
      </Tab.List>
      <div className="flex items-center justify-between text-alert-success">
        <div className="flex gap-2">
          <ClockIcon className="w-5" />
          <span className="font-bold">Total registrado:</span>
        </div>
        {`${props.time} horas`}
      </div>
      <Tab.Panels>
        <Tab.Panel>
          <ProfessionalActivityForm date={props.date} setOpen={props.setOpen} />
        </Tab.Panel>
        <Tab.Panel>
          <PersonalActivityForm date={props.date} setOpen={props.setOpen} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
