pragma solidity ^0.4.23;

contract WorldHouse{
    address private owner;
    string private greetMsg;
    event BuySuccess(address buyer);
    struct HouseData{
        uint16 row;
        uint16 col;
        uint8 used;
    }
    mapping(address => HouseData) houseRecord;
    mapping(uint16 => mapping(uint16 => address)) grid;

    constructor() public{
        owner = msg.sender;
        greetMsg = "Welcome to WorldHouse!";
    }

    function greet() public view returns(string){
        return greetMsg;
    }

    function getHouse() public view returns(uint16, uint16, uint8){
        HouseData storage data = houseRecord[msg.sender];
        return (data.row, data.col, data.used);
    }

    function buyHouse(uint16 row, uint16 col) public{
        require(houseRecord[msg.sender].used != 1, "Already has one");
        HouseData memory data = HouseData(row, col, 1);
        houseRecord[msg.sender] = data;
        grid[row][col] = msg.sender;
        emit BuySuccess(msg.sender);
    }

    function getGridInfos(uint16[] rows, uint16[] cols) public view returns(address[]){
        address[] memory gridOwners = new address[](rows.length);
        for(uint8 i = 0; i < rows.length; i++){
            uint16 row = rows[i];
            uint16 col = cols[i]; 
            gridOwners[i] = grid[row][col];
        }
        return gridOwners;
    }
}