import clsx from 'clsx'
export interface Props {
  className?: string
  priority?: 'primary' | 'secondary'
  isSubmit?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  onClick?: () => void
  children?: any
}

export default function Button(props: Props) {
  return (
    <button
      type={props.isSubmit ? 'submit' : 'button'}
      onClick={props.onClick}
      disabled={props.isDisabled}
      className={clsx(
        'flex justify-center gap-4',
        'font-semibold tracking-wide',
        'p-2 rounded-full',
        'border-transparent',
        {
          'cursor-not-allowed bg-moore/60': props.isDisabled,
          'cursor-wait': props.isLoading,
          'bg-moore text-white': props.priority === 'primary',
        },
        props.className
      )}
    >
      {props.children}
    </button>
  )
}
