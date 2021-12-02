import React from 'react'
import GridSquare from './GridSquare'

import { useSelector } from 'react-redux'
import { shapes } from '../utils'


export default function HoldBlock(props) {
  const holdShape = useSelector( (state) => state.game.holdShape )
  const box = shapes[holdShape][0]

  // Map the block to the grid
  const grid = box.map( (rowArray, row) => {
    return rowArray.map( (square, col) => {
      return <GridSquare key={`${row}${col}`} color={square === 0 ? 0 : holdShape} />
    })
  })

  return (
    <div>
      <div className="hold-title">Hold:</div>
      <div className="hold-block">
        { grid }
      </div>
    </div>
  )
}
