import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

const style = {
  marginBottom: 10,
}

export default ({ children, onSelect }) => (
  <View style={style}>
    <React.Fragment>{children}</React.Fragment>
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={{ ...StyleSheet.absoluteFill }} />
    </TouchableWithoutFeedback>
  </View>
)
