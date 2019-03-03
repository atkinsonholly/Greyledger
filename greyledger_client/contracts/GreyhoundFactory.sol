pragma solidity ^0.5.4;

contract greyhoundFactory {

  uint numGreyhounds;
  uint greyhoundRef = 16;
  uint refModulus = 10 ** greyhoundRef;

  struct Greyhound {
    string ear_marks;
    string sex;
    string sire;
    uint birthdate;
    string status;
    string owners;
    uint ref;
    mapping (uint => address) user;
  }

  Greyhound[] public greyhounds; // all greyhounds ever created

  event GreyhoundAdded(
    string ear_marks,
    string sex,
    string sire,
    uint birthdate,
    string status,
    string owners,
    uint randRef,
    uint greyhoundId
  );

  function _createGreyhound(
    string memory _ear_marks,
    string memory _sex,
    string memory _sire,
    uint _birthdate,
    string memory _status,
    string memory _owners,
    uint _randRef)
    private returns(uint) {
      numGreyhounds++;
      Greyhound memory greyhound = Greyhound(
        _ear_marks,
        _sex,
        _sire,
        _birthdate,
        _status,
        _owners,
        _randRef
      );
      uint index = greyhounds.push(greyhound) - 1;
      emit GreyhoundAdded(
        _ear_marks,
        _sex,
        _sire,
        _birthdate,
        _status,
        _owners,
        _randRef,
        index);
    return index;
  }

  function _generateRandomRef(string memory _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % refModulus;
  }

  function createUniqueGreyhound(
    string memory _name,
    string memory _ear_marks,
    string memory _sex,
    string memory _sire,
    uint _birthdate,
    string memory _status,
    string memory _owners
    ) public returns(uint) {
    uint randRef = _generateRandomRef(_name);
    uint greyhoundId = _createGreyhound(
      _ear_marks,
      _sex,
      _sire,
      _birthdate,
      _status,
      _owners,
      randRef
      );
    Greyhound storage g = greyhounds[greyhoundId];
    g.user[greyhoundId] = msg.sender;
    returns greyhoundId;
  }

  function findMyGreyhounds() public view returns(uint[] memory) {
    uint[] memory myGreyhounds;
    uint j = 0;
    for(uint i = 0; i<greyhounds.length; i++){
      Greyhound storage g = greyhounds[i];
      if(g.user[i] == msg.sender){
        myGreyhounds[j] = g.ref; //
        j++;
      }
    }
    return myGreyhounds;
  }

}
