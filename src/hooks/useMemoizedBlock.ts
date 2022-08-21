import { useMemo } from 'react'
import { blockSelectors } from '../recoil-hooks/blocks/selector'

export const useMemoizedBlock = (id: string) => useMemo(() => blockSelectors.useBlockById(id), [id])
