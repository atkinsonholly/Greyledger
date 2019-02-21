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

  render() {
      return (
        <div>
          <button onClick={this.setGreyHoundInformation}>Submit this Greyhound</button>
        </div>
      );
    }

}
export default SetGreyhoundInformation;
