import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, SafeAreaView } from 'react-native'

import Navigator from './src/navigation'
import store from './src/redux/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Navigator />
        </SafeAreaView>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
