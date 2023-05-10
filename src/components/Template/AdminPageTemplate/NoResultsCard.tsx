interface NoResultsCardProps {
  searchInput: string
}
export default function NoResultsCard(props: NoResultsCardProps) {
  return (
    <div className="flex flex-col justify-around items-center">
      <figure className="w-full h-64 bg-noResults bg-no-repeat bg-contain bg-center" />
      <div className="flex flex-col justify-center items-center gap-2 pb-4 w-full">
        <h2 className="text-2xl font-bold mb-2">¡Ups!</h2>
        <p>No hay resultados para</p>
        <p className="font-semibold">"{props.searchInput}"</p>
      </div>
    </div>
  )
}
