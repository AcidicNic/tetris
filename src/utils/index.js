export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const gridDefault = () => {
  const rows = 18
  const cols = 10
  const array = []

  for (let row = 0; row < rows; row++) {
      array.push([])
      for (let col = 0; col < cols; col++) {
        array[row].push(0)
      }
  }

  return array
}

export const controlKeys = {
  left: ["ArrowLeft", "Left", "a"],
  right: ["ArrowRight", "Right", "d"],
  down: ["ArrowDown", "Down", "s"],
  rotate: ["ArrowUp", "Up", "w", "x"],
  rotatePrev: ["q", "z"],
  holdShape: ["c", "e"],
  drop: [" "],
  pause: ["Escape", "Enter"],
  resume: ["Escape", "Enter"],
  restart: [" ", "Enter"],
}

export const shapes = [
  // none
  [[[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]]],

  // I
  [[[0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]]],

  // T
  [[[0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // L
  [[[0,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0]],

   [[1,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]]],

  // J
  [[[1,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,1,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,0,0],
    [1,1,1,0],
    [0,0,1,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [0,0,0,0]]],

  // Z
  [[[0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // S
  [[[0,0,0,0],
    [0,1,1,0],
    [1,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0]]],

  // O
  [[[0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
    [0,0,0,0]]]
]

export const randomShape = () => {
  return random(1, shapes.length - 1)
}

export const defaultValues = {
  x: 4,
  y: -4,
  speed: 1000,
}

export const defaultState = () => {
  return {
    // Create an empty grid
    grid: gridDefault(),
    // Get a new random shape
    shape: randomShape(),
    // set rotation of the shape to 0
    rotation: 0,
    // center of the grid, above the top
    x: defaultValues.x,
    y: defaultValues.y,
    // set the index of the next shape to a new random shape
    nextShape: randomShape(),
    // holding nothing
    holdShape: 0,
    canHoldShape: true,
    // Tell the game that it's currently running
    isRunning: true,
    // Set the score to 0
    score: 0,
    // Set the default speed
    speed: defaultValues.speed,
    // Game isn't over yet
    gameOver: false,
    scoreSaved: false,
    // Rows completed
    lines: 0,
    // level
    level: 0,
    highScore: getHighScore()
  }
}

export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length
}

export const prevRotation = (shape, rotation) => {
  if (rotation === 0) {
    return shapes[shape].length - 1
  }
  return (rotation - 1) % shapes[shape].length
}

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation]

  const gridWidth = grid[0].length - 1
  const gridHeight = grid.length - 1

  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col] !== 0) {
        const proposedX = col + x
        const proposedY = row + y
        const possibleRow = grid[proposedY]
        if (proposedX < 0 || proposedX > gridWidth || proposedY > gridHeight) {
          return false
        } else if (possibleRow !== undefined) {
          if (possibleRow[proposedX] !== 0) {
            return false
          }
        }
      }
    }
  }
  return true
}

export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  let blockOffGrid = false
  const block = shapes[shape][rotation]
  const newGrid = [ ...grid ]
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const yIndex = row + y
        if (yIndex < 0) {
          blockOffGrid = true
        } else {
          newGrid[row + y][col + x] = shape
        }
      }
    }
  }
  return { grid: newGrid, gameOver: blockOffGrid }
}

export const checkRows = (grid) => {
  const points = [0, 40, 100, 300, 1200]
  let completedRows = 0
  for (let row = 0; row < grid.length; row++) {
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1
      grid.splice(row, 1)
      grid.unshift(Array(10).fill(0))
    }
  }
  return {points: points[completedRows], lines: completedRows}
}

export const moveBlockDown = (state, moveInc = 1) => {
  const { shape, grid, x, y, rotation, nextShape, holdShape,
    score, isRunning, lines, level, speed, scoreSaved, canHoldShape } = state
  const maybeY = y + moveInc
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
    if (!scoreSaved) {
      saveHighScore(score)
      return { ...state, gameOver: true, scoreSaved: true }
    }
    return { ...state, gameOver: true }
  }

  const newState = defaultState()
  newState.grid = newGrid
  newState.shape = nextShape
  newState.holdShape = holdShape
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
}

export const calculateLevel = (linesCleared) => {
  return Math.floor(linesCleared / 2)
}

export const calculateSpeed = (level) => {
  if (level <= 9) {
    return 1000 - (level * 100)
  }
  return 100
}

const HIGH_SCORE = "HIGH_SCORE"

export const getHighScore = () => {
  try {
  // Grab the state from local storage
    const serializedState = localStorage.getItem(HIGH_SCORE)
    if (serializedState === null) {
      return 0
    }
    // convert the string into JSON for the Redux store
    return JSON.parse(serializedState)
  } catch(err) {
    return 0
  }
}

export const saveHighScore = (score) => {
  try {
    let highScore = getHighScore()
    if (!highScore) {
      localStorage.setItem("HIGH_SCORE", JSON.stringify(score))
      return
    }
    if (highScore < score) {
      localStorage.setItem("HIGH_SCORE", JSON.stringify(score))
    }

  } catch(err) {
    console.log(err)
  }
}
