import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="container mx-auto h-[93vh] space-y-4 px-4 pt-20 text-center text-xl">
      <figure className="h-1/2 w-full bg-pageNotFound bg-contain bg-center bg-no-repeat" />
      <p className="font-bold">
        La página que estas buscando no fue encontrada.
      </p>
      <Link to="/" className="block hover:text-moore">
        Ir a la página principal
      </Link>
    </div>
  )
}
