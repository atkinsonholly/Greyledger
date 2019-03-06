pragma solidity >=0.4.21 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GreyhoundFactory.sol";

contract TestNewGreyhound {
    function testCanReadGreyhoundCount() public {
        GreyhoundFactory greyhoundFactory = GreyhoundFactory(DeployedAddresses.GreyhoundFactory());

        greyhoundFactory.getNumGreyhounds();

        uint expected = 0;

        Assert.equal(greyhoundFactory.getNumGreyhounds(), expected, "It should return the greyhound count.");
    }
}
