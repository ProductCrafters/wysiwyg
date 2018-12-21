import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Header, Content, Icon } from 'native-base'

import mapDispatchToProps from './actions'

class Home extends Component {
  render() {
    const { navigation, sayHello, hello } = this.props

    return (
      <Container>
        <Icon name="md-pizza" />
      </Container>
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
