import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate, rotatePrev,
  pause, resume, restart, drop, holdShape } from '../actions'
import { controlKeys } from '../utils'
import HighScore from './HighScore'

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
        e.preventDefault();
      }
      return
    }

    // Restart after game has ended
    if (gameOver) {
      if (controlKeys.restart.includes(e.key)) {
        dispatch(restart())
        e.preventDefault();
      }
      return
    }

    // Pause game
    if (controlKeys.pause.includes(e.key)) {
      dispatch(pause())
      e.preventDefault();
      return
    }

    // TODO: enable this when drop() works
    // if (controlKeys.drop.includes(e.key)) dispatch(drop())

    // Move down
    if (controlKeys.down.includes(e.key)) {
      dispatch(moveDown())
      e.preventDefault();
    }

    // Move left/right
    if (controlKeys.left.includes(e.key)) {
      dispatch(moveLeft())
      e.preventDefault();
    }
    else if (controlKeys.right.includes(e.key)) {
      dispatch(moveRight())
      e.preventDefault();
    }

    // rotate forwards/backwards
    if (controlKeys.rotate.includes(e.key)) {
      dispatch(rotate())
      e.preventDefault();
    }
    else if (controlKeys.rotatePrev.includes(e.key)) {
      dispatch(rotatePrev())
      e.preventDefault();
    }

    // Hold shape
    if (controlKeys.holdShape.includes(e.key)) {
      dispatch(holdShape())
      e.preventDefault();
    }
  }

  return (

    <div className="controls-wrapper">
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
    <HighScore />

    </div>
  )
}
