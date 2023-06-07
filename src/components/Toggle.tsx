import { Switch } from '@headlessui/react'

interface Props {
  toggleValue: boolean
  disabled: boolean
  setToggleValue: (value: boolean) => void
}

export default function Toggle(props: Props) {
  return (
    <div className="flex items-center justify-end gap-2 text-sm font-semibold italic text-gray-lighter">
      por días
      <Switch
        checked={props.toggleValue}
        onChange={props.setToggleValue}
        className={`${props.toggleValue ? 'bg-moore-dark' : 'bg-moore-light'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${props.toggleValue ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      por horas
    </div>
  )
}
