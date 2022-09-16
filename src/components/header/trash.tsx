import Icon from '../common/icon'
import trashSvg from '../../assets/icons/trash.svg'
import { editorConfigActions } from '../../jotai-hooks/editorConfig/action'

const Trash = () => {
  const toggleSidebar = editorConfigActions.useToggleSidebar()

  return (
    <Icon src={trashSvg} hovered={trashSvg} clicked={trashSvg} alt="Menu Button" style={{ position: 'relative' }} />
  )
}

export default Trash
