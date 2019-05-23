import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

import withGridSnap from '../../../utils/withGridSnap'
import withEvent from '../../../utils/withEvents'

import { EVENT_MOVE_NEW, EVENT_MOVE, EVENT_MOVE_END } from '../../../constants'

const style = {
  borderColor: 'red',
  borderWidth: StyleSheet.hairlineWidth,
}

class CapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: props.style.top,
      left: props.style.left,
      width: props.style.width,
      height: props.style.height,
      display: false,
    }
    props.events.addListener(EVENT_MOVE_NEW, this.onMoveStart)
  }

  onMoveStart = ({ x0, y0 }) => {
    this.setState({ display: true })
    this.props.events.addListener(EVENT_MOVE, ({ dx, dy }) => this.onMove({ x0, y0, dx, dy }))
    this.props.events.addListener(EVENT_MOVE_END, () => {
      const { top, left, width, height } = this.state
      const coordinates = this.props.snapGrid(left, top, left + width, top + height)
      this.props.onSelectRect(coordinates)
      this.props.events.removeAllListeners(EVENT_MOVE)
      this.props.events.removeAllListeners(EVENT_MOVE_END)
    })
  }

  onMove = ({ x0, y0, dx, dy }) => {
    const coordinates = this.props.snapGrid(x0, y0, x0 + dx, y0 + dy)
    this.setState({
      top: coordinates.y0,
      left: coordinates.x0,
      width: coordinates.x1 - coordinates.x0,
      height: coordinates.y1 - coordinates.y0,
      display: true,
    })
  }

  render() {
    const { top, left, width, height, display } = this.state

    if (!display) {
      return null
    }

    return (
      <TouchableWithoutFeedback onPress={this.props.onSelectComponent}>
        <View
          style={{
            ...style,
            ...this.props.style,
            ...{ top, left, width, height },
          }}
        />
      </TouchableWithoutFeedback>
    )
  }
}

export default withGridSnap(withEvent(CapComponent))
