import React from 'react'
import { Text } from 'react-native'

import { Input, Button, Card } from '../../../components'
import withGridSnap from '../../../utils/withGridSnap'
import ComponentContainer from './ComponentContainer'

const EmptyElement = () => <Text>Element not exists</Text>

const getComponentByType = (type) => {
  switch (type) {
    case 'Input':
      return Input
    case 'Button':
      return Button
    case 'Card':
      return Card
    default:
      return EmptyElement
  }
}

class PreviewContainer extends React.Component {
  render() {
    const { config = [], areaWidth, areaHeight } = this.props

    return (
      <React.Fragment>
        {config.map((i) => {
          const Component = withGridSnap(getComponentByType(i.type))
          return (
            <ComponentContainer
              key={i.id}
              {...i}
              areaWidth={areaWidth}
              areaHeight={areaHeight}
              Component={Component}
            />
          )
        })}
      </React.Fragment>
    )
  }
}

export default PreviewContainer
