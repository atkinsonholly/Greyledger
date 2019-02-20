pragma solidity >=0.4.21 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/NewGreyhound.sol";

contract TestNewGreyhound {
    function testCanReadGreyhoundCount() public {
        NewGreyhound newGreyhound = NewGreyhound(DeployedAddresses.NewGreyhound());

        newGreyhound.getGreyhoundCount();

        uint expected = 0;

        Assert.equal(newGreyhound.getGreyhoundCount(), expected, "It should return the greyhound count.");
    }
}
