import React from 'react'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import Icon from '../../common/icon'
import enlargeSvg from '../../../assets/icons/enlarge.svg'

const Scale = () => {
  const changeScale = pageConfigActions.useChangeScale()
  return <Icon src={enlargeSvg} alt={enlargeSvg} style={{ position: 'relative' }} />
}

export default React.memo(Scale)
