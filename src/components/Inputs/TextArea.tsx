import clsx from 'clsx'

export interface Props {
  type: 'text' | 'email' | 'password'
  label: string
  name: string
  placeholder?: string
  error?: string
  register?: any
  required?: boolean
  className?: string
  isLoading?: boolean
  onChange?: (value: any) => string
}

export default function TextArea(props: Props) {
  return (
    <div className="w-full">
      <label className="font-bold text-moore">{props.label}</label>
      <textarea
        className={clsx(
          'w-full bg-white/75',
          'mt-2 px-4 py-2',
          'text-gray',
          'caret-moore outline-none',
          'rounded border border-gray-lighter',
          'hover:border-moore',
          'focus:ring focus:ring-moore/40',
          { 'cursor-wait': props.isLoading },
          props.className
        )}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange}
        disabled={props.isLoading}
        {...props.register(props.name, { require: props.required })}
      />
      <p className="mt-1 h-5 text-xs text-alert-error">
        {props.error && props.error}
      </p>
    </div>
  )
}
