import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Controller } from 'react-hook-form'
import clsx from 'clsx'

interface ComboBoxProps {
  name: string
  label: string
  placeholder: string
  options: { value: string; _id: string }[]
  defaultValue: { value: string; _id: string } | null
  error?: any
  required?: boolean
  control?: any
}

export default function ComboBox(props: ComboBoxProps) {
  const [selectedOption, setSelectedOption] = useState(props.options[0])
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? props.options
      : props.options.filter(option => {
          const optionFormatted = option.value.toUpperCase()
          return optionFormatted.includes(query.toUpperCase())
        })

  const emptyValue = { _id: '', value: 'Sin definir' }

  useEffect(
    () => setSelectedOption(props.defaultValue ?? emptyValue),
    [props.defaultValue]
  )

  return (
    <Controller
      control={props.control}
      defaultValue=""
      name={props.name}
      rules={{ required: props.required }}
      render={({ field: { onChange } }) => (
        <Combobox
          as={'div'}
          className="relative w-full"
          value={selectedOption}
          onChange={e => {
            onChange(e)
            setSelectedOption(e)
          }}
        >
          <Combobox.Label className="font-bold capitalize text-moore">
            {props.label}
          </Combobox.Label>
          <div className="relative">
            <Combobox.Input
              className={clsx(
                'input',
                'w-full bg-white/75',
                'mt-2 px-4 py-2 pr-8',
                'text-gray',
                'caret-moore outline-none',
                'rounded border border-gray-lighter',
                'hover:border-moore',
                'focus:ring focus:ring-moore/40'
              )}
              autoComplete="off"
              required={props.required}
              placeholder={props.placeholder}
              displayValue={(option: any) => option.value}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button
              className={clsx(
                'absolute inset-y-0 right-0 top-2',
                'w-1/2',
                'flex items-center justify-end',
                'pr-2',
                'text-gray-lighter active:text-moore'
              )}
            >
              <ChevronUpDownIcon className="h-5 w-5 " aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <div className="relative w-full">
              <Combobox.Options
                static
                className={clsx(
                  'h-fit max-h-60 w-full overflow-scroll',
                  'absolute z-40 mt-2',
                  'rounded-md bg-moore-dark py-4 shadow-lg',
                  'border border-gray-lighter',
                  'text-sm font-semibold text-white',
                  'cursor-pointer'
                )}
              >
                {!props.required && (
                  <Combobox.Option
                    key={'option-SD'}
                    value={emptyValue}
                    className={({ active }) =>
                      clsx('p-4 hover:bg-gray-light hover:text-moore', {
                        'bg-gray-light text-moore': active,
                      })
                    }
                  >
                    {emptyValue.value}
                  </Combobox.Option>
                )}
                {filteredOptions.length === 0 && query !== '' ? (
                  <div className="cursor-default select-none p-4 uppercase">
                    No hay resultados
                  </div>
                ) : (
                  filteredOptions.map((option, i) => (
                    <Combobox.Option
                      key={'option-' + i}
                      value={option}
                      className={({ active }) =>
                        clsx('p-4 hover:bg-gray-light hover:text-moore', {
                          'bg-gray-light text-moore': active,
                        })
                      }
                    >
                      {option.value}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </div>
          </Transition>
          <p className="mt-1 h-5  text-xs text-alert-error">
            {props.error && props.error}
          </p>
        </Combobox>
      )}
    />
  )
}
