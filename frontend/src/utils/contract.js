export const CONTRACT_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

export const CONTRACT_ABI = [
  "function getOwner() view returns (address)",
  "function deadline() view returns (uint256)",
  "function candidateCount() view returns (uint256)",
  "function getCandidate(uint256 _index) view returns (string, uint256)",
  "function hasVoted(address) view returns (bool)",
  "function addCandidate(string memory _name)",
  "function vote(uint256 _candidateIndex)",
  "event CandidateAdded(string name)",
  "event Voted(address voter, uint256 candidateIndex)"
];
