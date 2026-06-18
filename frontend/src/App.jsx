import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

import ConnectWallet from "./components/ConnectWallet";
import CandidateList from "./components/CandidateList";
import AddCandidate from "./components/AddCandidate";
import StatusMessage from "./components/StatusMessage";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contract";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [votingEnded, setVotingEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getErrorMessage = (err) => {
    if (err?.reason) return err.reason;
    if (err?.shortMessage) return err.shortMessage;
    if (err?.message) return err.message;
    return "Terjadi error.";
  };

const connectWallet = async () => {
  try {
    setError("");
    setMessage("");

    if (!window.ethereum) {
      setError("MetaMask belum terpasang di browser.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

const network = await provider.getNetwork();

if (Number(network.chainId) !== 31337) {
  setError(
    "Network salah. Silakan pindah ke Hardhat Localhost (Chain ID 31337)."
  );
  return;
}

await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const votingContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    setAccount(userAddress);
    setContract(votingContract);

    await loadContractData(votingContract, userAddress);

    setMessage("Wallet berhasil terhubung.");
  } catch (err) {
    setError(getErrorMessage(err));
  }
};

  const loadContractData = async (votingContract, userAddress) => {
    try {
      const count = await votingContract.candidateCount();
      const contractDeadline = await votingContract.deadline();
      setDeadline(Number(contractDeadline));
      const totalCandidates = Number(count);

      const candidateData = [];

      for (let i = 0; i < totalCandidates; i++) {
        const candidate = await votingContract.getCandidate(i);

        candidateData.push({
          name: candidate[0],
          voteCount: Number(candidate[1]),
        });
      }

      setCandidates(candidateData);

      if (userAddress) {
        const votedStatus = await votingContract.hasVoted(userAddress);
        setHasVoted(votedStatus);

        const ownerAddress = await votingContract.getOwner();
        console.log("OWNER =", ownerAddress);
        console.log("USER =", userAddress);

        setIsOwner(ownerAddress.toLowerCase() === userAddress.toLowerCase());
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const addCandidate = async (name) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const tx = await contract.addCandidate(name);
      await tx.wait();

      setMessage("Kandidat berhasil ditambahkan.");
      await loadContractData(contract, account);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

    const voteCandidate = async (candidateIndex) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const tx = await contract.vote(candidateIndex);
      await tx.wait();

      setMessage("Vote berhasil dikirim.");
      await loadContractData(contract, account);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Aplikasi Voting dApp</h1>
        <p>Aplikasi voting sederhana berbasis Blockchain.</p>
   

        {deadline > 0 && (
          <p>
            Voting Deadline:{" "}
            {new Date(deadline * 1000).toLocaleString()}
          </p>
        )}
      </header>

      <main className="dashboard">

        <div className="main-panel">
          <CandidateList
            candidates={candidates}
            voteCandidate={voteCandidate}
            account={account}
            hasVoted={hasVoted}
            loading={loading}
            deadline={deadline}
            votingEnded={votingEnded}
          />
        </div>

        <div className="side-panel">
          <ConnectWallet
            account={account}
            connectWallet={connectWallet}
          />

          <AddCandidate
            addCandidate={addCandidate}
            isOwner={isOwner}
            loading={loading}
          />
          
          <StatusMessage
            loading={loading}
            message={message}
            error={error}
          />
        </div>

      </main>
    </div>
  );
}

export default App;