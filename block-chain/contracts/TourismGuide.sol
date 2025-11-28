// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TourismGuide {
    // ---- Ownership ----
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // ---- Guides ----
    struct Guide {
        bool isVerified;
        string metadataURI;
    }

    mapping(bytes32 => Guide) private _guides;

    function setGuide(
        bytes32 guideHash,
        bool isVerified,
        string calldata metadataURI
    ) external onlyOwner {
        _guides[guideHash] = Guide({
            isVerified: isVerified,
            metadataURI: metadataURI
        });
    }

    function isGuideVerified(bytes32 guideHash)
        external
        view
        returns (bool)
    {
        return _guides[guideHash].isVerified;
    }

    // ---- Bookings ----
    struct Booking {
        bool exists;
        bytes32 guideHash;
        bytes32 userHash;
        uint256 amount;
        string currency;
        string offchainRef;
        uint256 timestamp;
    }

    mapping(bytes32 => Booking) public bookings;

    function recordBooking(
        string calldata bookingId,
        bytes32 guideHash,
        bytes32 userHash,
        uint256 amount,
        string calldata currency,
        string calldata offchainRef
    ) external onlyOwner {
        require(amount > 0, "amount=0");

        bytes32 key = keccak256(bytes(bookingId));
        require(!bookings[key].exists, "booking exists");

        bookings[key] = Booking({
            exists: true,
            guideHash: guideHash,
            userHash: userHash,
            amount: amount,
            currency: currency,
            offchainRef: offchainRef,
            timestamp: block.timestamp
        });
    }
}
