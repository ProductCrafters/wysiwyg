import React from 'react'

import { grid } from '../config'

const { width, height, paddingLeft, paddingRight, paddingTop } = grid

const defaultPoint = { x: 0, y: 0 }
const getCoordinates = (areaWidth, areaHeight, from = defaultPoint, to = defaultPoint) => {
  const realWidth = areaWidth - (paddingLeft + paddingRight)
  const unitWidth = realWidth / width

  const fromX = from.x * unitWidth + paddingLeft
  const toX = to.x * unitWidth + paddingLeft
  const fromY = from.y * height + paddingTop
  const toY = to.y * height + paddingTop

  return { fromX, fromY, toX, toY }
}

const withGridSnap = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      const { areaWidth, areaHeight, from, to } = this.props
      const { fromX, fromY, toX, toY } = getCoordinates(areaWidth, areaHeight, from, to)
      const top = Math.min(fromY, toY)
      const height = Math.abs(fromY - toY)
      const left = Math.min(fromX, toX)
      const width = Math.abs(fromX - toX)
      return <WrappedComponent {...this.props} style={{ top, left, height, width, position: 'absolute' }} />
    }
  }

  return HOC
}

export default withGridSnap
