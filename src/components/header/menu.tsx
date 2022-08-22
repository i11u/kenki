import Icon from '../common/icon'
import openMenuSvg from '../../assets/icons/open-menu.svg'
import closeMenuSvg from '../../assets/icons/close-menu.svg'
import { editorConfigActions } from '../../recoil-hooks/editorConfig/action'

const Menu = () => {
  const toggleSidebar = editorConfigActions.useToggleSidebar()

  return (
    <Icon
      src={openMenuSvg}
      hovered={closeMenuSvg}
      clicked={closeMenuSvg}
      alt="Menu Button"
      style={{ left: '1%' }}
      onClick={toggleSidebar}
    />
  )
}

export default Menu
