import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'

import withGridSnap from '../../../utils/withGridSnap'
import withEvent from '../../../utils/withEvents'

import { EVENT_MOVE_NEW, EVENT_MOVE, EVENT_MOVE_END } from '../../../constants'

class CapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: props.style.top,
      left: props.style.left,
      width: props.style.width,
      height: props.style.height,
    }
    props.events.addListener(EVENT_MOVE_NEW, this.onMoveStart)
  }

  onMoveStart = ({ x0, y0 }) => {
    this.props.events.addListener(EVENT_MOVE, ({ dx, dy }) => this.onMove({ x0, y0, dx, dy }))
    this.props.events.addListener(EVENT_MOVE_END, () => {
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
    })
  }

  render() {
    const { top, left, width, height } = this.state
    return (
      <TouchableWithoutFeedback onPress={this.props.onSelect}>
        <View
          style={{ ...this.props.style, ...{ top, left, width, height }, backgroundColor: 'red' }}
        />
      </TouchableWithoutFeedback>
    )
  }
}

export default withGridSnap(withEvent(CapComponent))
