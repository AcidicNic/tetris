import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

export default function HighScore(props) {
  const dispatch = useDispatch()
  const game = useSelector((state) => state.game)
  const { score, highScore } = game

  return (
    <div className="high-score">
      High Score: { Math.max(score, highScore) }
    </div>
  )
}
