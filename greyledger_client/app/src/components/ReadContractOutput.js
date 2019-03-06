import React from "react";

class ReadContractOutput extends React.PureComponent {

  state = {
    count: 0,
    greyhoundUniqueRefs: ["REGISTER GREYHOUNDS TO OBTAIN UNIQUE REFERENCE NUMBERS"],
    userAddresses: []
  };

  componentDidMount() {
    this.readGreyhoundContract()
    .then(resp => this.setState(resp));
  }

  readGreyhoundContract = async() => {
    const newObj = {
      count: 0,
      greyhoundUniqueRefs: []
    };
    const { drizzle } = this.props;
    const contract = drizzle.contracts.greyhoundFactory;
    newObj.count = await contract.methods.getNumGreyhounds().call();
    let refArray = [];
    const response = await contract.methods.findMyGreyhounds().call();
    if (response !== null) {
      refArray = response;
      newObj.greyhoundUniqueRefs = refArray.sort(function (a, b) { return (a - b) });
      return newObj;
    }
  }

  render() {
    return(
      <div>
        <p>Greyhounds registered: {this.state.count}</p>
        {this.state.greyhoundUniqueRefs.length > 0 ? <p>Your unique greyhound reference numbers:</p> : null }
        <p>{this.state.greyhoundUniqueRefs.map(ref => <li key={ref}>{ref}</li>)}</p>
      </div>
    )
  }

}

export default ReadContractOutput;
