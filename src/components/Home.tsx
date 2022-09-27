import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colorThemeSelector } from '../jotai-hooks/colorTheme/selector'

const Home = () => {
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <StyledWrapper style={{ backgroundColor: colorTheme.background }}>
      <StyledFlex>
        <StyledTitle>键记</StyledTitle>
        <p>
          鍵記 (kenki) is a keyboard-driven, graphical note-taking app. <br /> kenki is greatly inspired by qutebrowser
          in its user interface and typora in its undistracted design.
        </p>
        <Link to="./page">
          <StyledButton style={{ backgroundColor: colorTheme.background, color: colorTheme.textPrimary }}>
            Try the editor alpha
          </StyledButton>
        </Link>
      </StyledFlex>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const StyledFlex = styled.div`
  position: absolute;
  height: fit-content;
  top: 20px;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 5% 5%;
`

const StyledTitle = styled.div`
  font-family: Tahoma, sans-serif;
  font-size: 30px;
  color: #000000;
`

const StyledButton = styled.button`
  width: fit-content;
  height: 40px;
  text-align: center;
  font-family: Tahoma, sans-serif;
  border: 2px solid #000000;
  border-radius: 10px;
`

export default React.memo(Home)
