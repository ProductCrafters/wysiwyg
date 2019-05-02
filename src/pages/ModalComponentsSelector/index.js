import React from 'react'
import { View, Text } from 'react-native'
import { Button, Container } from 'native-base'

class ModalComponentsSelector extends React.Component {
  render() {
    return (
      <Container
        style={{
          flex: 1,
          backgroundColor: 'white',
          margin: 30,
          padding: 20,
        }}
      >
        <Button light onPress={() => this.props.navigation.goBack()}>
          <Text>Dismiss</Text>
        </Button>
      </Container>
    )
  }
}

export default ModalComponentsSelector
