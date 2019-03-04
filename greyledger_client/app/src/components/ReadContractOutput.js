import React from "react";

class ReadContractOutput extends React.PureComponent {

  state = {
    count: 0,
    greyhoundUniqueRefs: [],
    userAddresses: []
  };

  componentDidMount() {
    this.readGreyHoundContract()
    .then(resp => this.setState(resp));
  }

  readGreyHoundContract = async() => {
    const newObj = {
      count: 0,
      greyhoundUniqueRefs: [],
      userAddresses: []
    };
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.greyhoundFactory;
    newObj.count = await contract.methods.getNumGreyhounds().call();
    const refArray = await contract.methods.findMyGreyhounds().call();
    newObj.greyhoundUniqueRefs = refArray;
    return newObj;
  }

  render() {
    return(
      <div>
        <p>Greyhounds registered: {this.state.count}</p>
        <p>Your unique greyhound reference numbers:</p>
        <p>{this.state.greyhoundUniqueRefs.map(ref => <li key={ref}>{ref}</li>)}</p>
      </div>
    )
  }

}

export default ReadContractOutput;
