export default function NoResultsCard() {
  return (
    <div className="flex flex-col items-center justify-around">
      <figure className="h-64 w-full bg-noResults bg-contain bg-center bg-no-repeat" />
      <div className="flex w-full flex-col items-center justify-center gap-2 pb-4">
        <h2 className="mb-2 text-2xl font-bold">¡Ups!</h2>
        <p>No hay resultados </p>
      </div>
    </div>
  )
}
