import React from 'react'

export default function Info() {
  return (
    <div className="info">
      <table className="help-table table table-light">
        <thead>
          <tr>
            <th>Action</th>
            <th>Key(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Move Left</td>
            <td>Left Arrow, A</td>
          </tr>
          <tr>
            <td>Move Right</td>
            <td>Right Arrow, D</td>
          </tr>
          <tr>
            <td>Move Down</td>
            <td>Down Arrow, S</td>
          </tr>
          <tr>
            <td>Hold Piece</td>
            <td>C, E</td>
          </tr>
          <tr>
            <td>Rotate Right</td>
            <td>Up Arrow, W, X</td>
          </tr>
          <tr>
            <td>Rotate Left</td>
            <td>Q, Z</td>
          </tr>
          <tr>
            <td>Pause / Unpause</td>
            <td>Escape, Enter</td>
          </tr>
          <tr>
            <td>Restart After Game Over</td>
            <td>Space, Enter</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
