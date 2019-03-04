pragma solidity >=0.4.21 <0.6.0;

contract greyhoundFactory {

    uint numGreyhounds = 0;
    uint greyhoundRef = 16;
    uint refModulus = 10 ** greyhoundRef;
    uint[] myGreyhounds;

    struct Greyhound {
        string name; // greyhound name - can be updated
        string ear_marks; // greyhound ear_marks - can be updated (left_ear)
        string sexSireBirthdate; // these fields won't be updated by update function
        string status; // e.g. initial registration, new owner(s), retired, euthanised, natural death
        string owners; // string containing all owners and addresses
        uint ref; // pseudo-random number
        address[] users; // initialise an empty array of user addresses
    }

    Greyhound[] public greyhounds; // all greyhounds ever created

    event GreyhoundAdded(uint greyhoundId, string name);

    function getNumGreyhounds() public view returns (uint) {
        return numGreyhounds;
    }

    function _createGreyhound(
        string memory _name,
        string memory _ear_marks,
        string memory _sexSireBirthdate,
        string memory _status,
        string memory _owners,
        uint _randRef,
        address[] memory _address)
        private returns(uint) {
            numGreyhounds++;
            Greyhound memory greyhound = Greyhound(
                _name,
                _ear_marks,
                _sexSireBirthdate,
                _status,
                _owners,
                _randRef,
                _address
            );
            uint index = greyhounds.push(greyhound) - 1;
            emit GreyhoundAdded(index, _name);
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
        string memory _sexSireBirthdate,
        string memory _status,
        string memory _owners,
        address[] memory _address
        ) public returns(uint) {
        uint randRef = _generateRandomRef(_name);
        uint greyhoundId = _createGreyhound(
            _name,
            _ear_marks,
            _sexSireBirthdate,
            _status,
            _owners,
            randRef,
            _address
            );
        Greyhound storage g = greyhounds[greyhoundId];
        g.users.push(msg.sender);
        return greyhoundId;
    }

    function findMyGreyhounds() public returns(uint[] memory) {
        uint[] memory tempGreyhoundList;
        myGreyhounds = tempGreyhoundList;
        uint j = 0;
        for(uint i = 0; i<greyhounds.length; i++){
            Greyhound storage g = greyhounds[i];
            for(uint k = 0; k<g.users.length; k++){
                address a = g.users[k];
                if(a == msg.sender){
                    myGreyhounds.push(g.ref);
                    j++;
                }
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
                // if greyhound found, update details
                if(keccak256(abi.encodePacked(g.name)) == keccak256(abi.encodePacked(_name))){
                    g.name = _new_name;
                    g.status = _status;
                    g.ear_marks = _ear_marks;
                    g.owners = _owners;

                    // only add user if new address
                    bool userCheck = false;
                    for(uint k = 0; k<g.users.length; k++){
                        address a = g.users[k];
                        if(a == msg.sender){
                            userCheck = true;
                        }
                    }
                    if(userCheck == false){
                        g.users.push(msg.sender);
                    }

                    // return new name
                    return g.name;
                }
            }
        // if greyhound name not found, return message
        return "Unsuccessful request";
    }

}
