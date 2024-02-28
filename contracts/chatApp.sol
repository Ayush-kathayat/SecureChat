// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract ChatApp{

  //user structure
  struct user{
    string name;
    friend[] friends;
  }

  // friend structure
  struct friend{
    string name;
    address friendAddress;
  } 

  // message structure
  struct message{
    string msg; 
    address sender;
    // address receiver;
    uint256 timestamp;
  }

  // mapping of user address to user

  mapping(address => user) public users;


  mapping(bytes32 => message[]) public messages;

 

  // CHECK USER EXIST  [its just a function which we are using in our require statement to check if user exist or not] 
  function checkUserExist(address pubkey) public view returns(bool){
    return bytes(users[pubkey].name).length > 0;
  }

  // ADD USER or create account

  function addUser(string calldata _name) external{
    require(!checkUserExist(msg.sender), "User already exist");
    require(bytes(_name).length > 0, "username cannot be empty");
    users[msg.sender].name = _name;
  }

  //get username
  function getUserName(address pubkey) external view returns(string memory){  
    require(checkUserExist(pubkey), "User does not exist");
    return users[pubkey].name;
  }

  //add freinds

  function addFriend(address friend_key, string calldata _name) external {

    require(checkUserExist(msg.sender), "Create an account first");
    
    require(checkUserExist(friend_key), "User is not registered");

    require(msg.sender != friend_key, "Users cannot add themselves as friends");

    require(_checkAlreadyFriends(msg.sender, friend_key) == false,"These users are already friends");

    _addFriend(msg.sender , friend_key , _name);
    _addFriend(friend_key, msg.sender, users[msg.sender].name);
  }

  //checkFREINDS ALREADY EXists or not 
  function _checkAlreadyFriends(address pubkey1 , address pubkey2) internal view returns(bool){

    if(users[pubkey1].friends.length > users[pubkey2].friends.length){
      address tmp = pubkey1;
      pubkey1 = pubkey2;
      pubkey2 = tmp;
    }

    for(uint256 i = 0 ; i < users[pubkey1].friends.length; i++){
      
      if(users[pubkey1].friends[i].friendAddress == pubkey2){
         return true;
      }
    }

    return false;
  }

  // internal function to add friend
  function _addFriend(address me, address friend_key, string memory _name ) internal {

    friend memory newFriend = friend(_name, friend_key);
    users[me].friends.push(newFriend);
  }


  // get the friend

  function getMyFriendList() external view returns(friend[] memory){
    require(checkUserExist(msg.sender), "Create an account first");
    return users[msg.sender].friends;
  }

  // get the chat

  function getChat(address friend_key) external view returns(message[] memory){
    require(checkUserExist(msg.sender), "Create an account first");
    require(checkUserExist(friend_key), "User is not registered");
    bytes32 chatId = keccak256(abi.encodePacked(msg.sender, friend_key));
    return messages[chatId];
  }
  

}