import React, { Component } from "react";
import ReadContractOutput from "./ReadContractOutput";
import SetGreyhoundInformation from "./SetGreyhoundInformation";


class Register extends Component {

  state = {
    loading: true,
    drizzleState: null
  };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";

    return (
      <div className="Registration">
          <ReadContractOutput
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
          <SetGreyhoundInformation
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
      </div>
    );
  }

}

export default Register
