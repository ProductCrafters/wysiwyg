import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Header, Content, Icon, Button, Text } from 'native-base'

import mapDispatchToProps from './actions'
import PageWrap from './components/PageWrap'

class Home extends Component {
  render() {
    return (
      <Container>
        <PageWrap />
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
