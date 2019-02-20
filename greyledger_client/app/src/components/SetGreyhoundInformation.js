import React from "react";

class SetGreyhoundInformation extends React.Component {

  state = {
    stackId: null,
    transactionStatus: 'No transactions'
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

  // // Transaction status error
  // getTxStatus = () => {
  //   // get the transaction states from the drizzle state
  //   const { transactions, transactionStack } = this.props.drizzleState;
  //   console.log(this.state.stackId);
  //   // get the transaction hash using our saved `stackId`
  //   const txHash = transactionStack[this.state.stackId];
  //   console.log(txHash)
  //   // initial txHash set to 'temp' while awaiting Metamask confirmation from user
  //   // if transaction hash does not exist, don't display anything
  //
  //   if (!txHash) return null;
  //   // while (txHash.includes("TEMP")) {
  //   //   console.log("loop" + txHash)
  //   //   setInterval(() => console.log(txHash), 500)
  //   // }
  //   console.log("out" + txHash)
  //   // otherwise, return the transaction status
  //   this.setState({
  //     transactionStatus: `Transaction status: ${transactions[txHash].status}`
  //   })
  // }
  //
  // componentDidUpdate(){
  //   this.getTxStatus()
  // }

  render() {
      return (
        <div>
          <button onClick={this.setGreyHoundInformation}>Add New Greyhound</button>
          <div><p>Transaction status: {this.state.transactionStatus}</p></div>
        </div>
      );
    }

}
export default SetGreyhoundInformation;
