import clsx from 'clsx'
export interface Props {
  className?: string
  primary?: boolean
  secondary?: boolean
  outline?: boolean
  priority?: 'primary' | 'secondary'
  isSubmit?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  onClick?: () => void
  children?: any
}

export default function Button(props: Props) {
  const isDisabled = props.isDisabled || props.isLoading
  return (
    <button
      type={props.isSubmit ? 'submit' : 'button'}
      onClick={props.onClick}
      disabled={isDisabled}
      className={clsx(
        'flex justify-center gap-4',
        'font-semibold tracking-wide',
        'btn rounded p-2',
        'border-transparent outline',
        'hover:bg-black focus:outline-moore',
        {
          'cursor-not-allowed bg-moore-dark/30 text-white/50 hover:bg-moore-dark/30':
            props.isDisabled,
          'cursor-wait': props.isLoading,
          'bg-moore text-white hover:text-white': props.primary,
          'bg-moore-dark text-white hover:text-white': props.secondary,
          'bg-transparent text-black outline-transparent hover:border hover:border-moore hover:bg-transparent hover:text-moore':
            props.outline,
        },
        props.className
      )}
    >
      {props.children}
    </button>
  )
}
