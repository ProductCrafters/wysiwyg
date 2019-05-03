import React from 'react'
import { View } from 'react-native'

import withGridSnap from '../../../utils/withGridSnap'
import withEvent from '../../../utils/withEvents'

class ComponentContainer extends React.Component {
  render() {
    const { Component, style, ...props } = this.props
    return (
      <View style={style}>
        <Component {...props} />
      </View>
    )
  }
}

export default withGridSnap(withEvent(ComponentContainer))
