import React from 'react'
import _ from 'lodash'
import { View, StyleSheet, Text, PanResponder, TouchableWithoutFeedback } from 'react-native'

import { grid } from '../../../config'
import GridComponent from './GridComponent'
import CapComponent from './CapComponent'
import { events } from '../../../utils/withEvents'
import PreviewContainer from './PreviewContainer'
import { EVENT_MOVE_NEW, EVENT_MOVE_BEGIN, EVENT_MOVE, EVENT_MOVE_END } from '../../../constants'
import coordinatesToUnits from '../../../utils/coordinatesToUnits'

class PageWrap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      selectedElement: null,
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

  getUniqId = () => {
    const time = new Date().getTime().toString()
    return _.uniqueId(`auto_${time}`)
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

  handleSelectElement = (element) => {
    const { id } = element
    this.setState({ selectedElement: id })
  }

  handleResize = ({ id, from, to }) => {
    let hasChanges = false
    const newConfig = this.props.renderConfig.map((i) => {
      if (i.id !== id) {
        return i
      }

      hasChanges = true
      return { ...i, from, to }
    })

    if (hasChanges) {
      this.props.onUpdate(newConfig)
    }
  }

  handleSelectZone = ({ x0, y0, x1, y1 }) => {
    this.props.navigation.navigate('ModalComponentsSelector', {
      onSelect: (element) => {
        const { id, props } = element

        const data = {
          ...props,
          type: id,
          id: this.getUniqId(),
          ...coordinatesToUnits(x0, y0, x1, y1, this.state.width),
        }

        this.props.onUpdate([...this.props.renderConfig, data])
      },
      onCancel: () => {
        console.log('cancel')
      },
    })
  }

  handleUnselect = () => {
    events.removeAllListeners(EVENT_MOVE_BEGIN)
  }

  render() {
    const { width, height } = this.state

    return (
      <View
        style={{ ...StyleSheet.absoluteFill }}
        onLayout={this.handleLayout}
        {...this.panResponder.panHandlers}
      >
        <TouchableWithoutFeedback onPress={this.handleUnselect}>
          <View style={{ flex: 1 }}>
            {width && height ? (
              <React.Fragment>
                <GridComponent width={this.state.width} height={this.state.height} grid={grid} />
                <PreviewContainer
                  onSelectElement={this.handleSelectElement}
                  onResize={this.handleResize}
                  selectedEelment={this.state.selectedElement}
                  config={this.props.renderConfig}
                  areaWidth={this.state.width}
                  areaHeight={this.state.height}
                />
                <CapComponent
                  onSelectRect={this.handleSelectZone}
                  onSelectComponent={this.handleAddComponent}
                  areaWidth={this.state.width}
                  areaHeight={this.state.height}
                  from={{ x: 1, y: 1 }}
                  to={{ x: 12, y: 5 }}
                />
              </React.Fragment>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default PageWrap
