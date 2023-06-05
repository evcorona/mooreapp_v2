import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'

import { Controller } from 'react-hook-form'
import clsx from 'clsx'

interface ListBoxProps {
  name: string
  label: string
  placeholder: string
  options: string[]
  defaultValue: string
  error?: any
  required?: boolean
  control?: any
}

export default function ListBox(props: ListBoxProps) {
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => setSelectedOption(props.defaultValue), [props.defaultValue])

  return (
    <Controller
      control={props.control}
      defaultValue={props.defaultValue}
      rules={{ required: props.required }}
      name={props.name}
      render={({ field: { onChange } }) => (
        <Listbox
          as={'div'}
          className="relative w-full"
          value={selectedOption}
          onChange={e => {
            onChange(e)
            setSelectedOption(e)
          }}
        >
          <Listbox.Label className="font-bold capitalize text-moore">
            {props.label}
          </Listbox.Label>
          <Listbox.Button
            className={clsx(
              'input',
              'w-full bg-white/75',
              'mt-2 px-4 py-2',
              'text-left text-gray',
              'outline-none',
              'rounded border border-gray-lighter',
              'hover:border-moore',
              'focus:ring focus:ring-moore/40'
            )}
          >
            {selectedOption ?? (
              <p className="text-gray-lighter">{props.placeholder}</p>
            )}
            <div
              className={clsx(
                'absolute inset-y-0 right-0 top-2',
                'w-1/2',
                'flex items-center justify-end',
                'pr-2',
                'text-gray-lighter active:text-moore'
              )}
            >
              <ChevronUpDownIcon className="h-5 w-5 " aria-hidden="true" />
            </div>
          </Listbox.Button>
          <div className="relative w-full">
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className={clsx(
                'absolute z-40',
                'h-fit max-h-60 w-full overflow-scroll',
                'mt-2',
                'rounded-md border bg-moore-dark py-4 shadow-md',
                'border border-gray-lighter',
                'text-sm font-semibold text-white ',
                'cursor-pointer'
              )}
            >
              <Listbox.Options className="outline-none">
                <Listbox.Option
                  value={''}
                  disabled
                  className={clsx(
                    'cursor-default border-b px-4 pb-4 text-gray-lighter'
                  )}
                >
                  Selecciona una opción de la lista
                </Listbox.Option>
                {props.options.map((option, i) => (
                  <Listbox.Option
                    key={'listBoxOption' + i}
                    value={option}
                    className={({ active }) =>
                      clsx('p-4  hover:bg-gray-light hover:text-moore', {
                        'bg-gray-light text-moore': active,
                      })
                    }
                  >
                    {({ selected }) => (
                      <>
                        {selected ? (
                          <span className="flex gap-2">
                            <CheckIcon className="w-5" aria-hidden="true" />
                            {option}
                          </span>
                        ) : (
                          <span>{option}</span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
          <p className="mt-1 h-5 text-xs text-alert-error">
            {props.error && props.error}
          </p>
        </Listbox>
      )}
    />
  )
}
