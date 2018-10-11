import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import mapDispatchToProps from './actions'

class Home extends Component {
  render() {
    const { navigation, sayHello, hello } = this.props

    return (
      <View>
        <TouchableOpacity onPress={sayHello}>
          <Text>{navigation.state.routeName}</Text>
        </TouchableOpacity>
        {hello && <Text>Hello there</Text>}
      </View>
    )
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Home.defaultProps = {}

const mapStateToProps = ({ home: { hello } }) => {
  return {
    hello,
  }
}

Home.navigationOptions = () => ({
  header: null,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
