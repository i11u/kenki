import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import downloadSvg from '../../assets/icons/header/download.svg'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { blocksAtom } from '../../jotai-hooks/blocks/atom'
import { relationsAtom } from '../../jotai-hooks/relations/atom'

const Download = () => {
  const colorTheme = colorThemeSelector.useColorTheme()

  const blocks = useAtomValue(blocksAtom)
  const relations = useAtomValue(relationsAtom)

  const [data, setData] = useState('')

  useEffect(() => {
    const json = JSON.stringify({ blocks, relations })
    setData(json)
  }, [blocks, relations])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data)
      window.alert('Copied current page to clipboard in json format.')
    } catch (error) {
      window.alert('Failed to copy current page to clipboard.')
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <svg style={{ color: colorTheme.icon, height: '50%', transform: 'translateY(50%)' }} onClick={copyToClipboard}>
      <use xlinkHref={`${downloadSvg}#download`} />
    </svg>
  )
}

export default Download
