import React from "react";

class ReadContractOutput extends React.PureComponent {

  state = {
    count: null
  };

  componentDidMount() {
    this.readGreyHoundCount()
    .then(resp => this.setState({count: resp}));
  }

  readGreyHoundCount = async() => {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.NewGreyhound;
    const count = await contract.methods.getGreyhoundCount().call();
    return count;
  }

  render() {
    return <p>Greyhounds registered: {this.state.count}</p>;
  }

}

export default ReadContractOutput;
