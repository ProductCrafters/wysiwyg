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
    calcPosition = (from, to) => {
      return getCoordinates(this.props.areaWidth, this.props.areaHeight, from, to)
    }

    snapGrid = (x0, y0, x1, y1) => {
      const realWidth = this.props.areaWidth - (paddingLeft + paddingRight)
      const unitWidth = realWidth / width
      const fromX = Math.round((x0 - paddingLeft) / unitWidth) * unitWidth
      const toX = Math.round((x1 - paddingLeft) / unitWidth) * unitWidth
      const fromY = Math.round((y0 - paddingTop) / height) * height
      const toY = Math.round((y1 - paddingTop) / height) * height

      return {
        x0: Math.min(fromX, toX),
        y0: Math.min(fromY, toY),
        x1: Math.max(fromX, toX),
        y1: Math.max(fromY, toY),
      }
    }

    render() {
      const { areaWidth, areaHeight, from, to } = this.props
      const { fromX, fromY, toX, toY } = getCoordinates(areaWidth, areaHeight, from, to)
      const top = Math.min(fromY, toY)
      const height = Math.abs(fromY - toY)
      const left = Math.min(fromX, toX)
      const width = Math.abs(fromX - toX)
      return (
        <WrappedComponent
          {...this.props}
          style={{ top, left, height, width, position: 'absolute' }}
          calcPosition={this.calcPosition}
          snapGrid={this.snapGrid}
        />
      )
    }
  }

  return HOC
}

export default withGridSnap
