import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Svg, { Line } from 'react-native-svg'
import _ from 'lodash'

class GridComponent extends React.Component {
  render() {
    const pointSize = 1.5
    const { width, height, grid } = this.props
    const unitWidth = width / grid.width

    return (
      <Svg height={height} width={width}>
        {_.range(0, height, grid.height).map((h) => (
          <Line
            x1={0}
            y1={h}
            x2={width}
            y2={h}
            key={`line_${h}_${width}`}
            stroke='rgba(0, 0, 0, 0.2)'
            strokeWidth={1.6}
            strokeDasharray={`${pointSize} ${unitWidth - pointSize}`}
            strokeDashoffset={0.4}
          />
        ))}
      </Svg>
    )
  }
}

export default GridComponent
