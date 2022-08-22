import styled from 'styled-components'

type Props = {
  src: string
  // eslint-disable-next-line react/require-default-props
  hovered?: string
  // eslint-disable-next-line react/require-default-props
  clicked?: string
  alt: string
  // eslint-disable-next-line react/require-default-props
  style?: object
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void
}

const Icon = ({ src, hovered, clicked, alt, style, onClick }: Props) => (
  <StyledIcon src={src} alt={alt} style={style} onClick={onClick} />
)

const StyledIcon = styled.img`
  position: absolute;
  height: 60%;
  transform: translateY(35%);
`

export default Icon
