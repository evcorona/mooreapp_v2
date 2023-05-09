interface TitleProps {
  title: string
}

export default function Title(props: TitleProps) {
  return (
    <h1 className="text-black text-3xl font-semibold capitalize">
      {props.title}
    </h1>
  )
}
