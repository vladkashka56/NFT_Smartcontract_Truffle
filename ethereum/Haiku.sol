// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@thirdweb-dev/contracts/base/ERC721Base.sol";

contract Haiku is ERC721Base {

      constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}

    using Strings for uint256;

    mapping(uint256 => string) private _tokenURIs;

    function mintTo(address _to, string memory _tokenURI) public virtual override {
        require(_canMint(), "Not authorized to mint.");
        _tokenURIs[nextTokenIdToMint()] = _tokenURI;
        _safeMint(_to, 1, "");
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        string memory tokenUriForToken = _tokenURIs[_tokenId];
        if (bytes(tokenUriForToken).length > 0) {
            return tokenUriForToken;
        }

        string memory batchUri = _getBaseURI(_tokenId);
        return string(abi.encodePacked(batchUri, _tokenId.toString()));
    }

    function updateTokenURI(uint256 _tokenId, string memory _tokenURI) public virtual {
        require(_canSetOwner(), "Not authorized to update.");
        _tokenURIs[_tokenId] = _tokenURI;
    }

}