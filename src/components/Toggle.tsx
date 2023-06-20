import { Switch } from '@headlessui/react'
import clsx from 'clsx'

interface Props {
  toggleValue: boolean
  disabled: boolean
  setToggleValue: (value: boolean) => void
}

export default function Toggle(props: Props) {
  return (
    <div
      className={clsx(
        'flex',
        'items-center justify-end gap-2',
        'text-sm font-semibold italic text-gray-lighter'
      )}
    >
      por días
      <Switch
        checked={props.toggleValue}
        onChange={props.setToggleValue}
        className={clsx(
          'relative inline-flex',
          'h-[38px] w-[74px]',
          'shrink-0 cursor-pointer',
          'rounded-full border-2 border-transparent',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
          {
            'bg-moore-dark': props.toggleValue,
            'bg-moore-light': !props.toggleValue,
          }
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            'pointer-events-none',
            'h-[34px] w-[34px]',
            'rounded-full bg-white shadow-lg ring-0',
            'transform transition duration-200 ease-in-out',
            {
              'translate-x-9': props.toggleValue,
              'translate-x-0': !props.toggleValue,
            }
          )}
        />
      </Switch>
      por horas
    </div>
  )
}
