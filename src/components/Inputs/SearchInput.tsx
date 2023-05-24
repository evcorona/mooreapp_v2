import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { SyntheticEvent } from 'react'
import clsx from 'clsx'

interface Props {
  placeholder: string
  register?: any
  value?: string
  isLoading?: boolean
  onChange?: (e: SyntheticEvent) => void
}

export default function SearchInputNew(props: Props) {
  return (
    <div className="relative flex-grow active:border-moore">
      <div
        className={clsx(
          'absolute inset-y-0 left-0',
          'flex items-center',
          'pl-3',
          'pointer-events-none',
          'text-gray'
        )}
      >
        <MagnifyingGlassIcon className="w-icon-sm" aria-hidden="true" />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        disabled={props.isLoading}
        value={props.value ?? ''}
        className={clsx(
          'block w-full bg-white/50',
          'py-2 pl-10 pr-4',
          'rounded',
          'caret-moore outline-none',
          'placeholder:text-gray-lighter',
          'border',
          'focus:ring focus:ring-moore/40',
          'hover:border-moore',
          {
            'cursor-wait': props.isLoading,
          }
        )}
        placeholder={props.placeholder}
        {...props.register('search', {
          onChange: props.onChange,
        })}
      />
    </div>
  )
}
