import React from 'react'
import { relationSelectors } from '../../../jotai-hooks/relations/selector'
import RelationTSX from './relation'

const Relations = () => {
  const relations = relationSelectors.useRelationAtoms()

  return (
    <div>
      {relations.map((relationAtom, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <RelationTSX key={`relation-${index}`} relationAtom={relationAtom} />
      ))}
    </div>
  )
}

export default React.memo(Relations)
