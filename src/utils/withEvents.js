import React from 'react'
import EventEmitter from 'events'

const emitter = new EventEmitter()

const withEvents = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent {...this.props} events={emitter} />
    }
  }

  return HOC
}

export const events = emitter

export default withEvents
