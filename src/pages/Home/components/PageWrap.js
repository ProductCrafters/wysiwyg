import React from 'react'
import { View, StyleSheet, Text, PanResponder } from 'react-native'

import { grid } from '../../../config'
import GridComponent from './GridComponent'
import { events } from '../../../utils/withEvents'

const EVENT_MOVE_BEGIN = 'start_interact'
const EVENT_MOVE = 'interact'
const EVENT_MOVE_END = 'end_interact'

class PageWrap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (e, gestureState) => !!gestureState.dx || !!gestureState.dy,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (e, gestureState) => !!gestureState.dx || !!gestureState.dy,
      onPanResponderGrant: (evt, gestureState) => {
        events.emit(EVENT_MOVE_BEGIN, gestureState)
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState)
        events.emit(EVENT_MOVE, gestureState)
      },
      onPanResponderRelease: (evt, gestureState) => {
        events.emit(EVENT_MOVE_END, gestureState)
      },
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => false,
    })
  }

  handleLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    this.setState({ width, height })
  }

  render() {
    return (
      <View style={{ ...StyleSheet.absoluteFill }} onLayout={this.handleLayout} {...this.panResponder.panHandlers}>
        <GridComponent width={this.state.width} height={this.state.height} grid={grid} />
      </View>
    )
  }
}

export default PageWrap
