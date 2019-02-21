import React from "react";

class ReadContractOutput extends React.Component {

  state = {
    dataKey: null
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.NewGreyhound;

    // let drizzle know we want to watch the 'getGreyhoundCount' method
    let dataKey = contract.methods["getGreyhoundCount"].cacheCall();
    console.log(contract)
    console.log(dataKey)
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { NewGreyhound } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const greyhoundCount = NewGreyhound.getGreyhoundCount[this.state.dataKey];
    console.log(greyhoundCount)
    // if it exists, then we display its value
    return <p>Greyhounds registered: {greyhoundCount && greyhoundCount.value}</p>;
  }

}

export default ReadContractOutput;
