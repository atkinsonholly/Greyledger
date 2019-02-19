pragma solidity >=0.4.21 <0.6.0;

contract NewGreyhound {
  uint public greyhoundCount = 0;

  function getGreyhoundCount() public view returns(uint) {
    return greyhoundCount;
  }

  function addGreyhound() public returns(uint) {
    greyhoundCount += 1;
    return greyhoundCount;
  }

}
