pragma solidity ^0.4.23;

contract WorldHouse{
    address private owner;
    string private greeting;
    struct HouseData{
        uint row;
        uint col;
        bool used;
    }
    mapping(address => HouseData) houseRecord;

    constructor() public{
        owner = msg.sender;
        greeting = "Welcome to WorldHouse!";
    }

    function getHouse() public view returns(uint, uint, bool){
        HouseData storage data = houseRecord[msg.sender];
        return (data.row, data.col, data.used);
    }

    function buyHouse(uint row, uint col) public{
        require(houseRecord[msg.sender].used == true, "Already has one");
        HouseData memory data = HouseData(row, col, true);
        houseRecord[msg.sender] = data;
    }

}