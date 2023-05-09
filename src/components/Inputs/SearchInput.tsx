import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface Props {
  placeholder: string
  setSearchInput: (data: string) => void
}

//TODOL Fix search feature
export default function SearchInput(props: Props) {
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
        className={clsx(
          'block w-full bg-white/75',
          'pl-10 pr-4 py-2',
          'border rounded',
          'outline-none caret-moore',
          'placeholder:text-gray-lighter ',
          'focus:ring focus:ring-moore/40',
          'hover:border-moore'
        )}
        placeholder={props.placeholder}
        onChange={e => props.setSearchInput(e.target.value)}
      />
    </div>
  )
}
