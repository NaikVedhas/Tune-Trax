// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract local {

struct Artist{

string name;
address payable  artistAddress;
string location;                    
string instaId;
string twitterId;
string description;
string imageHash;
uint funds;
uint counter; 

string[] songsIpfsHash;
string[] namesOfSongs; 
string[] imageOfSongs;
address[] accessList;         
}
    
mapping (uint => Artist) public  noOfArtist;
uint public nthArtist;

Artist[] public arrArtist;

function registerArtist(
string memory _name,
address payable  _artistAddress,
string memory _location,
string memory _imageHash,
string memory _instaId,
string  memory _twitterId,
string memory _description
) public payable {



require(msg.value==0.1 ether, "Please pay the registration fees");

Artist storage newArtist = noOfArtist[nthArtist];
newArtist.name = _name;
newArtist.artistAddress = _artistAddress;
newArtist.location = _location;
newArtist.imageHash = _imageHash;
newArtist.instaId = _instaId;
newArtist.twitterId = _twitterId;
newArtist.description = _description;


nthArtist++;

arrArtist.push(newArtist);              



}


function addSong(uint _id, string memory _ipfsHash,string memory _nameOfSong, string memory _imageOfSong) public payable {


require(msg.value==0.05 ether, "Please pay the cost");
Artist storage thisArtist = noOfArtist[_id];      //Accessing a particular artist

thisArtist.songsIpfsHash.push(_ipfsHash);
thisArtist.namesOfSongs.push(_nameOfSong);
thisArtist.imageOfSongs.push(_imageOfSong);

arrArtist[_id]=thisArtist;   //Updating the array




}

function buySong(uint _id, uint _songId) public payable  returns(string memory){        //This function will be called by the music companies like spotify

Artist storage thisArtist = noOfArtist[_id]; 
require(msg.value == 1 ether,"Please pay exact amount");
thisArtist.funds = thisArtist.funds + (9*(msg.value))/10;    //We are storing 10% in our contract and using them later for supporting other artist 
arrArtist[_id]=thisArtist;
return thisArtist.songsIpfsHash[_songId];  //This is returing the hash which will be accessed at the frontend



}

function supportArtist(uint _id) public  payable {
Artist storage thisArtist = noOfArtist[_id];      //Accessing a particular artist
thisArtist.funds = thisArtist.funds+ msg.value;
arrArtist[_id]=thisArtist;

}

function collectFunds(uint _id) public  payable {   //This will be called by artist when he/she wants the take out funds from contract

Artist storage thisArtist = noOfArtist[_id]; 
thisArtist.artistAddress.transfer(thisArtist.funds);      //Transfering all the funds  
thisArtist.funds = 0;
arrArtist[_id]=thisArtist;


}

function addAccessMember(uint _id, address streamingCompanies) public {//Adding the Streaming Platforms in access list
Artist storage thisArtist = noOfArtist[_id]; 
thisArtist.accessList.push(streamingCompanies);
arrArtist[_id]=thisArtist;
}

function getArrArtist() public view  returns(Artist[] memory){

return arrArtist;
    
}


}