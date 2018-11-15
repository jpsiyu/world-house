pragma solidity ^0.4.23;

contract WorldHouse{
    address private owner;
    event BuySuccess(address buyer);
    struct HouseData{
        uint16 row;
        uint16 col;
        uint16 id;
        uint8 used;
    }
    mapping(address => HouseData) houseRecord;
    mapping(uint16 => mapping(uint16 => address)) landRecord;

    constructor() public{
        owner = msg.sender;
    }

    function getHouse() public view returns(uint16, uint16, uint16, uint8){
        HouseData storage data = houseRecord[msg.sender];
        return (data.row, data.col, data.id, data.used);
    }

    function getHouseId(address[] owners) public view returns(uint[]){
        uint len = owners.length;
        uint[] memory datas = new uint[](len);
        for(uint8 i = 0; i < len; i++){
            HouseData storage house = houseRecord[owners[i]];
            datas[i] = house.id;
        }
        return datas;
    }

    function buyHouse(uint16 row, uint16 col, uint16 id) public{
        require(houseRecord[msg.sender].used != 1, "Already has one");
        HouseData memory data = HouseData(row, col, id, 1);
        houseRecord[msg.sender] = data;
        landRecord[row][col] = msg.sender;
        emit BuySuccess(msg.sender);
    }

    function getLandOwners(uint16[] rows, uint16[] cols) public view returns(address[]){
        address[] memory landOwners = new address[](rows.length);
        for(uint8 i = 0; i < rows.length; i++){
            uint16 row = rows[i];
            uint16 col = cols[i]; 
            landOwners[i] = landRecord[row][col];
        }
        return landOwners;
    }

    function move(uint16 row, uint16 col) public {
        HouseData storage data = houseRecord[msg.sender];
        require(data.used == 1, "You do not have a house!");
        require(landRecord[row][col] == 0, "The land you want to move is not empty!");

        landRecord[data.row][data.col] = 0;
        HouseData memory newData = HouseData(row, col, data.id, 1);
        houseRecord[msg.sender] = newData;
        landRecord[row][col] = msg.sender;

    }
}