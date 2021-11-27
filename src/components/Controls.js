import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate } from '../actions'

export default function Controls(props) {
  const dispatch = useDispatch()
  const isRunning = useSelector((state) => state.game.isRunning)
  const gameOver = useSelector((state) => state.game.gameOver)

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
          src={`${process.env.PUBLIC_URL}/icons/arrow-left.svg`}/>
      </button>

      <button
        className="control-button"
        disabled={ !isRunning || gameOver }
        onClick={ (e) => {
          if (!isRunning || gameOver) { return }
          dispatch(moveRight())
      }}><img
        className="control-icon"
        src={`${process.env.PUBLIC_URL}/icons/arrow-right.svg`}/>
    </button>

      <button
        className="control-button"
        disabled={ !isRunning || gameOver }
        onClick={ (e) => {
          if (!isRunning || gameOver) { return }
          dispatch(rotate())
      }}><img
        className="control-icon"
        src={`${process.env.PUBLIC_URL}/icons/arrow-rotate.svg`}/>
    </button>

      <button
        className="control-button"
        disabled={ !isRunning || gameOver }
        onClick={ (e) => {
          if (!isRunning || gameOver) { return }
          dispatch(moveDown())
      }}><img
        className="control-icon"
        src={`${process.env.PUBLIC_URL}/icons/arrow-down.svg`}/>
    </button>
    </div>
  )
}
