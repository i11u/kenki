import React from 'react'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import Icon from '../../common/icon'
import reduceSvg from '../../../assets/icons/reduce.svg'

const DecrementScale = () => {
  const changeScale = pageConfigActions.useChangeScale()
  return <Icon src={reduceSvg} alt={reduceSvg} style={{ position: 'relative' }} />
}

export default React.memo(DecrementScale)
