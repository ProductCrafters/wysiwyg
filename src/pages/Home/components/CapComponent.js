import React from 'react'
import { View } from 'react-native'

import withGridSnap from '../../../utils/withGridSnap'

class CapComponent extends React.Component {
  render() {
    console.log(this.props)
    return <View style={{...this.props.style, backgroundColor: 'red'}}/>
  }
}

export default withGridSnap(CapComponent)
