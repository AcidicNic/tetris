import {
  MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE, HOLD_SHAPE, DROP, ROTATE_PREV, PAUSE, RESUME, RESTART, GAME_OVER
} from '../actions'

import {
  defaultState,
  nextRotation,
  prevRotation,
  canMoveTo,
  addBlockToGrid,
  checkRows,
  calculateLevel,
  calculateSpeed,
  saveHighScore,
  defaultValues,
  moveBlockDown,
  randomShape
} from '../utils'

const gameReducer = (state = defaultState(), action) => {
  const { shape, grid, x, y, rotation, nextShape, holdShape,
    score, isRunning, lines, level, speed, scoreSaved, canHoldShape } = state
  switch(action.type) {
      case ROTATE:
        const newCwRotation = nextRotation(shape, rotation)
        if (canMoveTo(shape, grid, x, y, newCwRotation)) {
            return { ...state, rotation: newCwRotation }
        }
        return state

      case ROTATE_PREV:
        const newCcwRotation = prevRotation(shape, rotation)
        if (canMoveTo(shape, grid, x, y, newCcwRotation)) {
            return { ...state, rotation: newCcwRotation }
        }
        return state

      case MOVE_RIGHT:
        if (canMoveTo(shape, grid, x + 1, y, rotation)) {
          return { ...state, x: x + 1 }
        }
        return state

      case MOVE_LEFT:
        if (canMoveTo(shape, grid, x - 1, y, rotation)) {
          return { ...state, x: x - 1 }
        }
        return state

      case MOVE_DOWN:
        return moveBlockDown(state)

      case RESUME:
        return { ...state, isRunning: true }

      case PAUSE:
        return { ...state, isRunning: false }

      case GAME_OVER:
        return state

      case RESTART:
        return defaultState()

      case HOLD_SHAPE:
        if (!canHoldShape) return state
        let newShape = holdShape
        let newNextShape = nextShape
        if (holdShape === 0) {
          newShape = nextShape
          newNextShape = randomShape()
        }
        return { ...state,
          shape: newShape,
          holdShape: shape,
          nextShape: newNextShape,
          canHoldShape: false,
          x: defaultValues.x,
          y: defaultValues.y,
        }

      case DROP:
        // TODO: make this work????
        // let maybeY = y
        // let newState = state
        //
        // while (canMoveTo(shape, grid, x, maybeY + 1, rotation)) {
        //   newState = moveBlockDown(state, maybeY)
        // }
        //
        // return newState

      default:
        return state
    }
}

export default gameReducer
