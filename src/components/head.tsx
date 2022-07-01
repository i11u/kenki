type Props = {
  title: string
}

function Head({ title }: Props) {
  return (
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </head>
  )
}

export default Head
