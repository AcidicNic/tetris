import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate, rotatePrev, pause, resume, restart } from '../actions'
import { controlKeys } from '../utils'

export default function Controls(props) {
  const dispatch = useDispatch()
  const isRunning = useSelector((state) => state.game.isRunning)
  const gameOver = useSelector((state) => state.game.gameOver)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
 
  const handleKeyDown = (e) => {
    if (e.defaultPrevented) return

    // Resume a paused game
    if (!isRunning) {
      if (controlKeys.resume.includes(e.key)) {
        dispatch(resume())
      }
      return
    }

    // Restart after game has ended
    if (gameOver) {
      if (controlKeys.restart.includes(e.key)) {
        dispatch(restart())
      }
      return
    }

    // Pause game
    if (controlKeys.pause.includes(e.key)) {
      dispatch(pause())
      return
    }

    // Move down
    if (controlKeys.down.includes(e.key)) dispatch(moveDown())

    // Move left/right
    if (controlKeys.left.includes(e.key)) dispatch(moveLeft())
    else if (controlKeys.right.includes(e.key)) dispatch(moveRight())

    // rotate forwards/backwards
    if (controlKeys.rotate.includes(e.key)) dispatch(rotate())
    else if (controlKeys.rotatePrev.includes(e.key)) dispatch(rotatePrev())

    e.preventDefault();
  }

  return (
    <div className="controls">
      <button
        className="control-button"
        disabled={ !isRunning || gameOver }
        onClick={ (e) => {
          if (!isRunning || gameOver) { return }
          dispatch(moveLeft())
        }}><img
          className="control-icon"
          src={`${process.env.PUBLIC_URL}/icons/arrow-left.svg`}
          alt="Left"/>
      </button>

      <button
        className="control-button"
        disabled={ !isRunning || gameOver }
        onClick={ (e) => {
          if (!isRunning || gameOver) { return }
          dispatch(moveRight())
      }}><img
        className="control-icon"
        src={`${process.env.PUBLIC_URL}/icons/arrow-right.svg`}
        alt="Right"/>
    </button>

      <button
        className="control-button"
        disabled={ !isRunning || gameOver }
        onClick={ (e) => {
          if (!isRunning || gameOver) { return }
          dispatch(rotate())
      }}><img
        className="control-icon"
        src={`${process.env.PUBLIC_URL}/icons/arrow-rotate.svg`}
        alt="Rotate"/>
    </button>

      <button
        className="control-button"
        disabled={ !isRunning || gameOver }
        onClick={ (e) => {
          if (!isRunning || gameOver) { return }
          dispatch(moveDown())
      }}><img
        className="control-icon"
        src={`${process.env.PUBLIC_URL}/icons/arrow-down.svg`}
        alt="Down"/>
    </button>
    </div>
  )
}
