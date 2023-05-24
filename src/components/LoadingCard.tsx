import clsx from 'clsx'

export default function LoadingCard() {
  return (
    <div
      className={clsx(
        'absolute bottom-10 right-10',
        'w-full',
        'flex items-end justify-end gap-4',
        'text-lg font-semibold tracking-wide text-moore'
      )}
    >
      <span className="loader"></span>
      Cargando...
    </div>
  )
}
