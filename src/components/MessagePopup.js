import React from 'react'
import { useSelector } from 'react-redux'

export default function MessagePopup(props) {
  const isRunning = useSelector((state) => state.game.isRunning)
  const gameOver = useSelector((state) => state.game.gameOver)

  let message = ''
  let details = ''
  let isHidden = 'hidden'

  if (gameOver) {
    message = 'Game Over'
    details = 'Press Space or Enter to restart!'
    isHidden = ''
  } else if (!isRunning) {
    message = 'Paused'
    isHidden = ''
  }

  return (
    <div className={`message-popup ${ isHidden }`}>
      <h1>{ message }</h1>
      <p>{ details }</p>
    </div>
  )
}
