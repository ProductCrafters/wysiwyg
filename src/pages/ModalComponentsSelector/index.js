import React from 'react'
import { View } from 'react-native'
import { Button, Container, Header, Right, Text } from 'native-base'

import ComponentSelector from './components/ComponentSelector'

class ModalComponentsSelector extends React.Component {
  handleSelect = (componentId) => {
    console.log(componentId)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          margin: 20,
        }}
      >
        <Header>
          <Right>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Container style={{ padding: 20 }}>
          <ComponentSelector onSelect={this.handleSelect} />
        </Container>
      </View>
    )
  }
}

export default ModalComponentsSelector
