import React from 'react'
import styled from 'styled-components'
import Icon from '../common/icon'
import shareSvg from '../../assets/icons/share.svg'
import feedbackSvg from '../../assets/icons/feedback.svg'
import settingsSvg from '../../assets/icons/settings.svg'
import guideSvg from '../../assets/icons/guide.svg'

const StyledHeaderConfig = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  gap: 0 25px;
  right: 1%;
`

function HeaderConfig() {
  return (
    <StyledHeaderConfig>
      <Icon src={shareSvg} hovered="" clicked="" alt="Resize Button" style={{ position: 'relative' }} />
      <Icon src={feedbackSvg} hovered="" clicked="" alt="Resize Button" style={{ position: 'relative' }} />
      <Icon src={settingsSvg} hovered="" clicked="" alt="Resize Button" style={{ position: 'relative' }} />
      <Icon src={guideSvg} hovered="" clicked="" alt="Resize Button" style={{ position: 'relative' }} />
    </StyledHeaderConfig>
  )
}

export default HeaderConfig
