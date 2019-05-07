import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

const styleSelected = {
  borderColor: 'red',
  borderWidth: StyleSheet.hairlineWidth,
}

const markerSize = 10
const markerHalfSize = markerSize / 2

export default (props) => {
  const { type, onPress } = props
  let style = {
    position: 'absolute',
    ...styleSelected,
  }

  switch (type) {
    case 'left':
      style = {
        ...style,
        bottom: markerHalfSize,
        top: markerHalfSize,
        left: -1 * markerHalfSize,
        width: markerSize,
      }
      break
    case 'right':
      style = {
        ...style,
        bottom: markerHalfSize,
        top: markerHalfSize,
        right: -1 * markerHalfSize,
        width: markerSize,
      }
      break
    case 'top':
      style = {
        ...style,
        top: -1 * markerHalfSize,
        left: markerHalfSize,
        right: markerHalfSize,
        height: markerSize,
      }
      break
    case 'bottom':
      style = {
        ...style,
        bottom: -1 * markerHalfSize,
        left: markerHalfSize,
        right: markerHalfSize,
        height: markerSize,
      }
      break
    case 'center':
      style = {
        ...style,
        top: markerHalfSize,
        bottom: markerHalfSize,
        left: markerHalfSize,
        right: markerHalfSize,
      }
      break
  }

  return (
    <TouchableWithoutFeedback onPressIn={() => onPress(type)}>
      <View style={style} />
    </TouchableWithoutFeedback>
  )
}
