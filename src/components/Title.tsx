interface TitleProps {
  title: string
}

export default function Title(props: TitleProps) {
  return (
    <h1 className="text-3xl font-semibold capitalize text-black">
      {props.title}
    </h1>
  )
}
