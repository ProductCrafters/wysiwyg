import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

class Home extends Component {
  render () {
    const { navigation } = this.props

    return (
      <View>
        <Text>{ navigation.state.routeName }</Text>
      </View>
    )
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Home.defaultProps = {

}

Home.navigationOptions = () => ({
  header: null,
})

export default Home
