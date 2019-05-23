import { grid } from '../config'

export default (x0, y0, x1, y1, areaWidth, paddingLeft = 0, paddingRight = 0, paddingTop = 0) => {
  const gridWidth = grid.width
  const height = grid.height
  const realWidth = areaWidth - (paddingLeft + paddingRight)
  const unitWidth = realWidth / gridWidth
  const fromX = Math.round((x0 - paddingLeft) / unitWidth)
  const toX = Math.round((x1 - paddingLeft) / unitWidth)
  const fromY = Math.round((y0 - paddingTop) / height)
  const toY = Math.round((y1 - paddingTop) / height)

  return {
    from: { x: Math.min(fromX, toX), y: Math.min(fromY, toY) },
    to: { x: Math.max(fromX, toX), y: Math.max(fromY, toY) },
  }
}
