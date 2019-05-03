import React from 'react'
import { View, StyleSheet, Text, PanResponder } from 'react-native'

import { grid } from '../../../config'
import GridComponent from './GridComponent'
import CapComponent from './CapComponent'
import { events } from '../../../utils/withEvents'
import PreviewContainer from './PreviewContainer'
import { EVENT_MOVE_NEW, EVENT_MOVE_BEGIN, EVENT_MOVE, EVENT_MOVE_END } from '../../../constants'

const renderConfig = [
  {
    id: 'component_1',
    type: 'Input',
    from: { x: 1, y: 10 },
    to: { x: 14, y: 12 },
    label: 'Username',
  },
  {
    id: 'component_2',
    type: 'Input',
    from: { x: 14, y: 10 },
    to: { x: 28, y: 12 },
    label: 'Password',
  },
  { id: 'component_3', type: 'Button', from: { x: 2, y: 15 }, to: { x: 20, y: 17 }, label: 'Save' },
]

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
  handleAddComponent = (...props) => {
    console.log(props)
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
            <PreviewContainer
              config={renderConfig}
              areaWidth={this.state.width}
              areaHeight={this.state.height}
            />
            <CapComponent
              onSelectRect={this.props.openSelectorModal}
              onSelectComponent={this.handleAddComponent}
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
