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
    }
  }

  onListeningBegin = ({ dx, dy, moveX, moveY, vx, vy, x0, y0 }) => {
    console.log(dx, dy, moveX, moveY, vx, vy, x0, y0, '--')
    const { events } = this.props
    events.addListener(EVENT_MOVE, this.onMove)
    events.addListener(EVENT_MOVE_END, this.onMoveEnd)
  }

  onMove = ({ dx, dy }) => {
    console.log(this.interactionType, dx, dy)
  }

  onMoveEnd = () => {
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
    let { Component, style, ...props } = this.props
    const { selected } = this.state
    if (selected) {
      style = { ...style, ...styleSelected }
    }
    return (
      <View style={style}>
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
