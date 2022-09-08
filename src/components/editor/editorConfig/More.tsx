import React from 'react'
import moreSvg from '../../../assets/icons/more.svg'
import Icon from '../../common/icon'

const More = () => (
  <Icon
    src={moreSvg}
    alt={moreSvg}
    style={{
      position: 'relative',
    }}
  />
)

export default React.memo(More)
