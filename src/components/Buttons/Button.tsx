import clsx from 'clsx'
export interface Props {
  className?: string
  primary?: boolean
  secondary?: boolean
  outline?: 'error' | 'info'
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
        'flex items-center justify-center gap-3',
        'btn tracking-wide',
        'border',
        {
          'cursor-not-allowed bg-moore-dark/30 text-white/50 hover:bg-moore-dark/30':
            props.isDisabled,
          'cursor-wait': props.isLoading,
          'border-moore bg-moore text-white hover:bg-black hover:text-white':
            props.primary,
          'border-moore bg-moore-dark text-white hover:bg-black hover:text-white':
            props.secondary,
          'border-alert-error bg-transparent text-alert-error hover:bg-alert-error hover:text-white':
            props.outline === 'error',
          'border-moore bg-transparent text-moore hover:bg-moore hover:text-white':
            props.outline === 'info',
        },
        props.className
      )}
    >
      {props.children}
    </button>
  )
}
