import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { grid } from '../../../config'
import GridComponent from './GridComponent'

class PageWrap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
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
      <View
        style={{ ...StyleSheet.absoluteFill }}
        onLayout={this.handleLayout}
      >
        <GridComponent width={this.state.width} height={this.state.height} grid={grid} />
      </View>
    )
  }
}

export default PageWrap
