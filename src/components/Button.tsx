import clsx from 'clsx'
export interface Props {
  className?: string
  primary?: boolean
  secondary?: boolean
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
        'border-transparent',
        'hover:bg-black hover:text-white',
        {
          'cursor-not-allowed bg-moore-dark/30 text-white/50 hover:bg-moore-dark/30':
            props.isDisabled,
          'cursor-wait': props.isLoading,
          'bg-moore text-white': props.primary,
          'bg-moore-dark text-white': props.secondary,
        },
        props.className
      )}
    >
      {props.children}
    </button>
  )
}
