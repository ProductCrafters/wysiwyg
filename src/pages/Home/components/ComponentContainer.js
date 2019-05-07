import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

import withGridSnap from '../../../utils/withGridSnap'
import withEvent from '../../../utils/withEvents'
import InteractionMarket from './InteractionMarket'
import { EVENT_MOVE_BEGIN, EVENT_MOVE, EVENT_MOVE_END } from '../../../constants'

const styleSelected = {
  borderColor: 'red',
  borderWidth: StyleSheet.hairlineWidth,
}

class ComponentContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      style: props.style,
    }
    this.style = props.style
  }
  // dx, dy, moveX, moveY, vx, vy, x0, y0
  onListeningBegin = () => {
    const { events } = this.props
    events.addListener(EVENT_MOVE, this.onMove)
    events.addListener(EVENT_MOVE_END, this.onMoveEnd)
  }

  getNewPosition = (dx, dy) => {
    if (this.interactionType === 'left') {
      if (dx < this.style.width) {
        return { left: this.style.left + dx, width: this.style.width - dx }
      }
    } else if (this.interactionType === 'right') {
      if (this.style.width + dx > 0) {
        return { width: this.style.width + dx }
      }
    } else if (this.interactionType === 'top') {
      if (dy < this.style.height) {
        return { top: this.style.top + dy, height: this.style.height - dy }
      }
    } else if (this.interactionType === 'bottom') {
      if (this.style.height + dy > 0) {
        return { height: this.style.height + dy }
      }
    } else if (this.interactionType === 'center') {
      return { top: this.style.top + dy, left: this.style.left + dx }
    }

    return null
  }

  onMove = ({ dx, dy }) => {
    // skip invalid interactions
    if (!['left', 'top', 'right', 'bottom', 'center'].includes(this.interactionType)) {
      return false
    }

    const styleDiff = this.getNewPosition(dx, dy) || {}
    this.setState({ style: { ...this.style, ...styleDiff } })
  }

  onMoveEnd = ({ dx, dy }) => {
    if (['left', 'top', 'right', 'bottom', 'center'].includes(this.interactionType)) {
      const styleDiff = this.getNewPosition(dx, dy) || {}
      this.style = { ...this.style, ...styleDiff }
    }

    const { events } = this.props
    this.interactionType = null
    events.removeAllListeners(EVENT_MOVE)
    events.removeAllListeners(EVENT_MOVE_END)
  }

  handleInteract = (type) => {
    this.interactionType = type
  }

  handleSelect = (e) => {
    e.preventDefault()
    const { events } = this.props
    this.setState({ selected: true })
    this.props.onSelect(this.props)
    events.removeAllListeners(EVENT_MOVE_BEGIN)
    events.removeAllListeners(EVENT_MOVE)
    events.removeAllListeners(EVENT_MOVE_END)
    events.addListener(EVENT_MOVE_BEGIN, this.onListeningBegin)
  }

  render() {
    let { Component, ...props } = this.props
    let { selected, style } = this.state
    const itemStyle = selected ? { ...style, ...styleSelected } : style
    return (
      <View style={itemStyle}>
        <Component {...props} />
        <TouchableWithoutFeedback onPress={this.handleSelect}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>
        {selected ? (
          <React.Fragment>
            <InteractionMarket type="center" onPress={this.handleInteract} />
            <InteractionMarket type="left" onPress={this.handleInteract} />
            <InteractionMarket type="right" onPress={this.handleInteract} />
            <InteractionMarket type="top" onPress={this.handleInteract} />
            <InteractionMarket type="bottom" onPress={this.handleInteract} />
          </React.Fragment>
        ) : null}
      </View>
    )
  }
}

export default withGridSnap(withEvent(ComponentContainer))
