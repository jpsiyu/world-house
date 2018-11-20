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
    mapping(uint16 => mapping(uint16 => uint16)) envRecord;
    uint count;

    constructor() public{
        owner = msg.sender;
    }

    function getHouse() public view returns(uint16, uint16, uint16, uint8){
        HouseData storage data = houseRecord[msg.sender];
        return (data.row, data.col, data.id, data.used);
    }

    function getHouses(address[] owners) public view returns(uint[]){
        uint len = owners.length;
        uint[] memory datas = new uint[](len);
        for(uint8 i = 0; i < len; i++){
            HouseData storage house = houseRecord[owners[i]];
            datas[i] = house.id;
        }
        return datas;
    }

    function getEnvs(uint16[] rows, uint16[] cols) public view returns(uint16[]){
        uint16[] memory envs = new uint16[](rows.length);
        for(uint8 i = 0; i < rows.length; i++){
            uint16 row = rows[i];
            uint16 col = cols[i];
            envs[i] = envRecord[row][col];
        }
        return envs;
    }

    function buyHouse(uint16 row, uint16 col, uint16 id) public onlyOne targetNotOwned(row, col) payable{
        _addRecord(row, col, id);
        count++;
        emit BuySuccess(msg.sender);
    }

    function buyEnv(uint16 row, uint16 col, uint16 id) public targetNotOwned(row, col) payable{
        envRecord[row][col] = id;
        count++;
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


    function move(uint16 row, uint16 col) public targetNotOwned(row, col)  {
        HouseData storage data = houseRecord[msg.sender];
        require(data.used == 1, "You do not have a house!");

        landRecord[data.row][data.col] = 0;
        _addRecord(row, col,data. id);
    }

    function getBasePrice() public view returns(uint){
        if(count <= 1000) return 1e15;
        else if(count <= 1000000) return 1e16;
        else return 1e17;
    }

    function isOwner() public view returns(bool){
        return msg.sender == owner;
    }


    function getBalance() public view ownerAccess returns(uint){
        return address(this).balance;
    }

    function withdraw() public ownerAccess {
        owner.transfer(getBalance());
    }

    // midifier
    modifier ownerAccess(){
        require(msg.sender == owner, "Access denied");
        _;
    }

    modifier onlyOne(){
        require(houseRecord[msg.sender].used != 1, "Already has one");
        _;
    }

    modifier targetNotOwned(uint16 row, uint16 col){
        require(landRecord[row][col] == 0, "The land is owned by someone!");
        require(envRecord[row][col] == 0, "The land is owned by someone!");
        _;
    }

    // private
    function _addRecord(uint16 row, uint16 col, uint16 id) private{
        HouseData memory data = HouseData(row, col, id, 1);
        houseRecord[msg.sender] = data;
        landRecord[row][col] = msg.sender;
    }
}