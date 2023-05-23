import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export interface Props {
  type: 'text' | 'email' | 'password' | 'number' | 'date'
  label: string
  name: string
  prefix?: 'currency' | 'time'
  value?: any
  placeholder?: string
  error?: string
  register?: any
  required?: boolean
  className?: string
  onChange?: (value: any) => any
}

export default function Input(props: Props) {
  return (
    <div className="relative w-full">
      <label className="font-bold text-moore">{props.label}</label>
      {props.prefix === 'currency' && (
        <CurrencyDollarIcon className="absolute bottom-9 left-2 w-5 text-gray" />
      )}
      <input
        className={clsx(
          'w-full bg-white/75',
          'mt-2 px-4 py-2',
          'text-gray',
          'caret-moore outline-none',
          'rounded border border-gray-lighter',
          'hover:border-moore',
          'focus:ring focus:ring-moore/40',
          { 'pl-10': props.prefix === 'currency' },
          props.className
        )}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange}
        min={0}
        step="any"
        {...props.register(props.name, {
          require: props.required,
          valueAsNumber: props.type === 'number',
          valueAsDate: props.type === 'date',
        })}
      />
      <p className="mt-1 h-5 text-xs text-alert-error">
        {props.error && props.error}
      </p>
    </div>
  )
}
