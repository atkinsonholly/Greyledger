import React from "react";

class SetGreyhoundInformation extends React.Component {

  state = {
    stackId: null
  };

  setGreyHoundInformation = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.NewGreyhound;

    const stackId = contract.methods["addGreyhound"].cacheSend({
      from: drizzleState.accounts[0]
    });
    console.log(stackId)
    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  // Transaction status error
  // getTxStatus = () => {
  //   // get the transaction states from the drizzle state
  //   const { transactions, transactionStack } = this.props.drizzleState;
  //   // get the transaction hash using our saved `stackId`
  //   const txHash = transactionStack[this.state.stackId];
  //   // if transaction hash does not exist, don't display anything
  //   if (!txHash) return null;
  //   // otherwise, return the transaction status
  //   return `Transaction status: ${transactions[txHash].status}`;
  // };

  render() {
      return (
        <div>
          <button onClick={this.setGreyHoundInformation}>Add Greyhound</button>
        </div>
      );
    }

}
export default SetGreyhoundInformation;
