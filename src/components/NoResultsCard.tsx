import clsx from 'clsx'

interface Props {
  className?: string
}

export default function NoResultsCard(props: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col',
        'items-center justify-around',
        props.className
      )}
    >
      <figure
        className={clsx(
          'h-64 w-full',
          'bg-noResults bg-contain bg-center bg-no-repeat'
        )}
      />
      <div
        className={clsx(
          'w-full pb-4',
          'flex flex-col',
          'items-center justify-center gap-2'
        )}
      >
        <h2 className="mb-2 text-2xl font-bold">¡Ups!</h2>
        <p>No hay resultados </p>
      </div>
    </div>
  )
}
