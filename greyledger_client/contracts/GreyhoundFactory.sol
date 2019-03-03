pragma solidity ^0.5.4;

contract greyhoundFactory {

    uint numGreyhounds;
    uint greyhoundRef = 16;
    uint refModulus = 10 ** greyhoundRef;

    struct Greyhound {
        mapping (uint => string) name;
        mapping (uint => string) ear_marks;
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
        uint greyhoundId);

    function getNumGreyhounds() public view returns (uint) {
        return numGreyhounds;
    }

    function _createGreyhound(
        string memory _sex,
        string memory _sire,
        uint _birthdate,
        string memory _status,
        string memory _owners,
        uint _randRef)
        private returns(uint) {
            numGreyhounds++;
            Greyhound memory greyhound = Greyhound(
                _sex,
                _sire,
                _birthdate,
                _status,
                _owners,
                _randRef
            );
            uint index = greyhounds.push(greyhound) - 1;
            emit GreyhoundAdded(index);
            return index;
    }

    function _generateRandomRef(string memory _str) private view returns (uint) {
        // generate a pseudo-random 16-digit number
        // this will be the greyhound's unique identifier
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
            _sex,
            _sire,
            _birthdate,
            _status,
            _owners,
            randRef
            );
        Greyhound storage g = greyhounds[greyhoundId];
        g.name[greyhoundId] = _name;
        g.ear_marks[greyhoundId] = _ear_marks;
        g.user[greyhoundId] = msg.sender;
        return greyhoundId;
    }

    function findMyGreyhounds(address _address) public view returns(uint[] memory) {
        uint[] memory myGreyhounds;
        uint j = 0;
        for(uint i = 0; i<greyhounds.length; i++){
            Greyhound storage g = greyhounds[i];
            if(g.user[i] == _address){
                myGreyhounds[j] = g.ref;
                j++;
            }
        }
        // return user's list of unique greyhound identifiers
        return myGreyhounds;
    }

    function updateGreyhound(
        string memory _name,
        string memory _new_name,
        string memory _status,
        string memory _ear_marks,
        string memory _owners) public returns(string memory) {
            for(uint i = 0; i<greyhounds.length; i++){
                Greyhound storage g = greyhounds[i];
                if(keccak256(abi.encodePacked(g.name[i])) == keccak256(abi.encodePacked(_name))){
                    g.name[i] = _new_name;
                    g.status = _status;
                    g.ear_marks[i] = _ear_marks;
                    g.owners = _owners;
                    g.user[i] = msg.sender;
                    return g.name[i];
                }
            }
        return "Unsuccessful request";
    }

}
