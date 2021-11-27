import {
  MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE,
  ROTATE_PREV, PAUSE, RESUME, RESTART, GAME_OVER
} from '../actions'

import {
  defaultState,
  nextRotation,
  prevRotation,
  canMoveTo,
  addBlockToGrid,
  checkRows,
  calculateLevel,
  calculateSpeed
} from '../utils'

const gameReducer = (state = defaultState(), action) => {
  const { shape, grid, x, y, rotation, nextShape, score, isRunning, lines, level, speed } = state

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
        const maybeY = y + 1
        if (canMoveTo(shape, grid, x, maybeY, rotation)) {
          return { ...state, y: maybeY }
        }
        const obj = addBlockToGrid(shape, grid, x, y, rotation)
        const newGrid = obj.grid
        const gameOver = obj.gameOver

        if (gameOver) {
          const newState = { ...state }
          newState.shape = 0
          newState.grid = newGrid
          return { ...state, gameOver: true }
        }

        const newState = defaultState()
        newState.grid = newGrid
        newState.shape = nextShape
        newState.score = score
        newState.isRunning = isRunning
        newState.lines = lines
        newState.level = level
        newState.speed = speed

        const newScore = checkRows(newGrid)
        newState.score = score + (newScore.points * (level + 1))
        newState.lines = lines + newScore.lines
        newState.level = calculateLevel(newState.lines)
        newState.speed = calculateSpeed(newState.level)

        return newState

      case RESUME:
        return { ...state, isRunning: true }

      case PAUSE:
        return { ...state, isRunning: false }

      case GAME_OVER:
        return state

      case RESTART:
        return defaultState()

      default:
        return state
    }
}
export default gameReducer
