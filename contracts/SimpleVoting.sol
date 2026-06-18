// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleVoting {

    address private owner;

    uint256 public deadline;

        struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;

    mapping(address => bool) public hasVoted;

    event CandidateAdded(string name);

    event Voted(address voter, uint256 candidateIndex);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(uint256 _deadline) {
        owner = msg.sender;
        deadline = _deadline;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function addCandidate(string memory _name)
        public
        onlyOwner
    {
        candidates.push(Candidate(_name, 0));

        emit CandidateAdded(_name);
    }

    function vote(uint256 _candidateIndex)
        public
    {
        
        require(
            block.timestamp < deadline,
            "Voting ended"
        );

        require(
            !hasVoted[msg.sender],
            "Already voted"
        );

        require(
            _candidateIndex < candidates.length,
            "Invalid candidate"
        );

        candidates[_candidateIndex]
            .voteCount++;

        hasVoted[msg.sender] = true;

        emit Voted(
            msg.sender,
            _candidateIndex
        );
    }

    function getCandidate(uint256 _index)
        public
        view
        returns(string memory, uint256)
    {
        Candidate memory candidate =
            candidates[_index];

        return (
            candidate.name,
            candidate.voteCount
        );
    }

    function candidateCount()
        public
        view
        returns(uint256)
    {
        return candidates.length;
    }

    
}