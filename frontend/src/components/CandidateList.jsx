function CandidateList({
  candidates,
  voteCandidate,
  account,
  hasVoted,
  loading,
  votingEnded
}) {
  return (
    <div className="card">
      <h2>Daftar Kandidat</h2>

      {candidates.length === 0 ? (
        <p>Belum ada kandidat.</p>
      ) : (
        <div className="candidate-list">
          {candidates.map((candidate, index) => (
            <div
              className="candidate-item"
              key={index}
            >
              <div className="candidate-info">
                <h3>{candidate.name}</h3>

                <div className="vote-badge">
                  {candidate.voteCount} Votes
                </div>
              </div>

              <button
                onClick={() =>
                  voteCandidate(index)
                }
                disabled={
                  !account ||
                  hasVoted ||
                  loading
                }
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      )}
      
      {votingEnded && (
        <p className="error">
          Voting telah selesai.
        </p>
      )}

      {!account && (
        <p className="info">
          Connect wallet dulu untuk voting.
        </p>
      )}

      {hasVoted && (
        <p className="success">
          Wallet ini sudah melakukan vote.
        </p>
      )}
    </div>
  );
}

export default CandidateList;

