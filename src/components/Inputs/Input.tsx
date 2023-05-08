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
  onChange?: (value: any) => string
}

export default function Input(props: Props) {
  return (
    <div className="w-full">
      <label className="text-moore font-bold">{props.label}</label>
      <input
        className={clsx(
          'w-full',
          'mt-2 py-3 px-4',
          'outline-none caret-moore',
          'border border-gray-400 rounded',
          'hover:border-moore',
          'focus:ring focus:ring-moore/40',
          props.className
        )}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange}
        {...props.register(props.name, { require: props.required })}
      />
      <p className="text-xs text-alert-error mt-1 h-5">
        {props.error && props.error}
      </p>
    </div>
  )
}
