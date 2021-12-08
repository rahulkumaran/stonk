// SPDX-License-Identifier: GPL-3.0


pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TesterTSS is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  uint256 public cost = 1 ether;
  uint256 public maxSupply = 100;
  uint256 public maxMintAmount = 5;
  uint256 public presaleStart = 1637984700;
  uint256 public saleStart = 1637985000;
  address private devAddress=0xE27083a3f30Db63DeDC003dCc9060D86e729448b;
  address private communityAddress=0xEea84398fe49ddA8810DFb44bB2CeA60656e8867;
  bool public paused = false;
  mapping(address => bool) public whitelisted;
  mapping(address => uint256) public whitelistBalance;

  address[2] _addresses = [0x4E2CC19317d23680AAfE52189491D12F890c3c02,0xd4aE60d4aF6dEc4de59bf5AC280355060871Dc79];

  constructor(
    string memory _initBaseURI
  ) ERC721("STCON", "STCON") {
    setBaseURI(_initBaseURI);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function reserveForGiveaway(uint256 amount) public onlyOwner {
    uint256 supply = totalSupply();
    for (uint256 i = 0; i < amount; i++) {
      _safeMint(devAddress, supply + i);
    }
  }

  // public
  function mint(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(!paused,"Minting is paused");
    require(_mintAmount > 0,"Mint amount must be greater than 0");
    require(_mintAmount <= maxMintAmount,"You can mint a max of 5");
    require(supply + _mintAmount <= maxSupply,"All pieces have been minted!");
    require(msg.value >= cost * _mintAmount,"Amount paid is less than required amount.");
    require(saleStart <= block.timestamp, "Sale isn't live yet");

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
    }
  }

  

  function mintWhitelist(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(presaleStart <= block.timestamp, "Presale yet to start");
    require(saleStart >= block.timestamp, "Presale Over");
    require(
      whitelistBalance[_to] > 0,
      "Address doesn't have any presale mint"
    );
    require(
      _mintAmount <= whitelistBalance[_to],
      "Address doesn't have enough presale balance"
    );
    require(msg.value == cost * _mintAmount, "Not enough was paid");
    

    whitelistBalance[_to] -= _mintAmount;

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    string memory websiteBaseURI = "https://alphatest.thestonksociety.com/api/attributes/nft-metadata/";
    if(keccak256(bytes(currentBaseURI)) == keccak256(bytes(websiteBaseURI))) {
      return bytes(currentBaseURI).length > 0
          ? string(abi.encodePacked(currentBaseURI, tokenId.toString()))
          : "";
    }
    else {
      return bytes(currentBaseURI).length > 0
          ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
          : "";
    }
  }

  //only owner

  function setPresaleTime(uint256 _time) public onlyOwner {
    presaleStart = _time;
  }

  function setSaleTime(uint256 _time) public onlyOwner {
    saleStart = _time;
  }

  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
 
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }

  function addWhitelistAddresses(address _address)
    external
    onlyOwner
  {
    require(_address != address(0), "Address cannot be 0.");
    require(whitelistBalance[_address] == 0, "Balance must be 0.");
    whitelistBalance[_address] = 2;
  }

  function withdraw() public onlyOwner {
    uint256 amount=(address(this).balance/2);
    payable(communityAddress).transfer(amount);
    payable(devAddress).transfer(amount);
  }

    //function withdraw() public payable onlyOwner {
    
    // Do not remove this otherwise you will not be able to withdraw the funds.
    // =============================================================================
    //(bool os, ) = payable(owner()).call{value: address(this).balance}("");
    //require(os);
    // =============================================================================
  //}
}