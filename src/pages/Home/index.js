import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { AsyncStorage } from 'react-native'
import { Container } from 'native-base'

import mapDispatchToProps from './actions'
import PageWrap from './components/PageWrap'

// Config for testing
const defaultConfig = [
  {
    id: 'component_1',
    type: 'Input',
    from: { x: 1, y: 10 },
    to: { x: 14, y: 14 },
    label: 'Username',
  },
  {
    id: 'component_2',
    type: 'Input',
    from: { x: 14, y: 10 },
    to: { x: 28, y: 14 },
    label: 'Password',
  },
  { id: 'component_3', type: 'Button', from: { x: 2, y: 15 }, to: { x: 20, y: 17 }, label: 'Save' },
]
const DATA_KEY = 'config_data'

const getData = () => {
  return AsyncStorage.getItem(DATA_KEY)
    .then((data) => {
      return JSON.parse(data) || defaultConfig
    })
    .catch((e) => {
      console.error(e)
      return Promise.resolve([])
    })
}

const setData = (data) => {
  return AsyncStorage.setItem(DATA_KEY, JSON.stringify(_.isEmpty(data) ? [] : data))
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      renderConfig: [],
    }
  }

  componentWillMount() {
    getData().then((renderConfig) => {
      this.setState({ renderConfig })
    })
  }

  openComponentsSelectorModal = () => {
    this.props.navigation.navigate('ModalComponentsSelector')
  }

  handleUpdateConfig = (renderConfig) => {
    this.setState({ renderConfig })
    setData(renderConfig)
  }

  render() {
    return (
      <Container>
        <PageWrap
          openSelectorModal={this.openComponentsSelectorModal}
          onUpdate={this.handleUpdateConfig}
          renderConfig={this.state.renderConfig}
        />
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
