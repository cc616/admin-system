import React, { Component } from 'react'

export default (ImportComponent) => {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        stateComponent: null,
      }
    }

    componentDidMount() {
      this.getComponent()
    }

    getComponent = () => {
      ImportComponent()
        .then(({ default: component }) => {
          this.setState({
            stateComponent: component,
          })
        })
        .catch((err) => {
          this.setState({
            stateComponent: null,
          })
          throw err
        })
    }

    render() {
      const { stateComponent: StateComponent } = this.state
      return StateComponent ? <StateComponent {...this.props} /> : null
    }
  }

  return AsyncComponent
}
