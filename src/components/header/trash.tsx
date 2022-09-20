import React from 'react'
import trashSvg from '../../assets/icons/header/trash.svg'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { useRemoveAllBlocks } from '../../jotai-hooks/blocks/action'
import { modeActions } from '../../jotai-hooks/mode/action'
import { useRemoveAllRelations } from '../../jotai-hooks/relations/action'

const Trash = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const removeBlocks = useRemoveAllBlocks()
  const removeRelations = useRemoveAllRelations()
  const changeMode = modeActions.useSwitchModes()

  const handleOnClick = () => {
    if (window.confirm('Do you want to clear the current contents?')) {
      removeBlocks()
      removeRelations()
    }
    changeMode('CURSOR')
  }

  return (
    <svg
      style={{ color: colorTheme.icon, height: '50%', transform: 'translateY(50%)' }}
      onClick={() => handleOnClick()}
    >
      <use xlinkHref={`${trashSvg}#trash`} />
    </svg>
  )
}

export default React.memo(Trash)
