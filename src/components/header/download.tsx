import Icon from '../common/icon'
import downloadSvg from '../../assets/icons/download.svg'

const Download = () => (
  <Icon
    src={downloadSvg}
    hovered={downloadSvg}
    clicked={downloadSvg}
    alt="Menu Button"
    style={{ position: 'relative' }}
  />
)

export default Download
