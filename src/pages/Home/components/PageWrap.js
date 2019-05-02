import React from 'react'
import { View, StyleSheet, Text, PanResponder } from 'react-native'

import { grid } from '../../../config'
import GridComponent from './GridComponent'
import CapComponent from './CapComponent'
import { events } from '../../../utils/withEvents'

import { EVENT_MOVE_NEW, EVENT_MOVE_BEGIN, EVENT_MOVE, EVENT_MOVE_END } from '../../../constants'

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
        if (events.listenerCount(EVENT_MOVE_BEGIN)) {
          events.emit(EVENT_MOVE_BEGIN, gestureState)
        } else {
          events.emit(EVENT_MOVE_NEW, gestureState)
        }
      },
      onPanResponderMove: (evt, gestureState) => {
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
    const { width, height } = this.state

    return (
      <View
        style={{ ...StyleSheet.absoluteFill }}
        onLayout={this.handleLayout}
        {...this.panResponder.panHandlers}
      >
        {width && height ? (
          <React.Fragment>
            <GridComponent width={this.state.width} height={this.state.height} grid={grid} />
            <CapComponent
              onSelect={this.props.openSelectorModal}
              areaWidth={this.state.width}
              areaHeight={this.state.height}
              from={{ x: 1, y: 1 }}
              to={{ x: 12, y: 5 }}
            />
          </React.Fragment>
        ) : null}
      </View>
    )
  }
}

export default PageWrap
