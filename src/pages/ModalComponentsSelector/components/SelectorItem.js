import React from 'react'
import { View } from 'react-native'

const style = {
  marginBottom: 10,
}

export default ({ children }) => (
  <View style={style}>
    <React.Fragment>{children}</React.Fragment>
  </View>
)
