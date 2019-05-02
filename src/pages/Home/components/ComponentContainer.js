import React from 'react'
import { View } from 'react-native'

import withGridSnap from '../../../utils/withGridSnap'
import withEvent from '../../../utils/withEvents'

class CapComponent extends React.Component {
  render() {
    return <View style={{...this.props.style, backgroundColor: 'red'}}/>
  }
}

export default withGridSnap(withEvent(CapComponent))
