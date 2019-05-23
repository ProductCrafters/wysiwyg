import React from 'react'
import _ from 'lodash'
import { ScrollView } from 'react-native'
import { Text } from 'native-base'

import { Button, Card, Input } from '../../../components'
import SelectorItem from './SelectorItem'

const components = [
  {
    id: 'Text',
    component: (props) => <Text>{props.text}</Text>,
    props: {
      text: 'Simple text',
    },
  },
  {
    id: 'Button',
    component: Button,
    props: {
      label: 'button',
      light: true,
    },
  },
  {
    id: 'Card',
    component: Card,
    props: {
      text: 'Some card text',
    },
  },
  {
    id: 'Input',
    component: Input,
    props: {
      label: 'Example',
    },
  },
]

class ComponentSelector extends React.Component {
  handleSelectItem = (item) => () => {
    this.props.onSelect(item)
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {_.map(components, (i) => {
          const Component = i.component
          return (
            <SelectorItem key={i.id} onSelect={this.handleSelectItem(i)}>
              <Component {...i.props} />
            </SelectorItem>
          )
        })}
      </ScrollView>
    )
  }
}
export default ComponentSelector
