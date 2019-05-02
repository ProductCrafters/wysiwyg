import React from 'react'
import _ from 'lodash'
import { ScrollView } from 'react-native'
import { Text } from 'native-base'

import { Button, Card, Input } from '../../../components'
import SelectorItem from './SelectorItem'

const components = {
  Text: {
    component: (props) => <Text>{props.text}</Text>,
    props: {
      text: 'Simple text',
    },
  },
  Button: {
    component: Button,
    props: {
      label: 'button',
      light: true,
    },
  },
  Card: {
    component: Card,
    props: {
      text: 'Some card text',
    },
  },
  Input: {
    component: Input,
    props: {
      label: 'Example',
    },
  },
}

class ComponentSelector extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {_.map(components, (i, key) => {
          const Component = i.component
          return (
            <SelectorItem key={key}>
              <Component {...i.props} />
            </SelectorItem>
          )
        })}
      </ScrollView>
    )
  }
}
export default ComponentSelector
