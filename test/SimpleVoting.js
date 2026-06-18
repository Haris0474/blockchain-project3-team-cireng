const { expect } = require("chai");

describe("SimpleVoting", function () {

  let voting;
  let owner;
  let voter1;

  beforeEach(async function () {

    [owner, voter1] =
      await ethers.getSigners();

    const latestBlock =
      await ethers.provider.getBlock(
        "latest"
      );

    const deadline =
      latestBlock.timestamp + 86400;

    const Voting =
      await ethers.getContractFactory(
        "SimpleVoting"
      );

    voting =
      await Voting.deploy(deadline);

    await voting.waitForDeployment();
  });

  it("Should set correct owner",
    async function () {

      expect(
        await voting.getOwner()
      ).to.equal(owner.address);
  });

  it("Should start with zero candidates",
    async function () {

      expect(
        await voting.candidateCount()
      ).to.equal(0);
  });

  it("Should add candidate",
    async function () {

      await voting.addCandidate("Alice");

      expect(
        await voting.candidateCount()
      ).to.equal(1);
  });

  it("Should allow voting",
    async function () {

      await voting.addCandidate("Alice");

      await voting
        .connect(voter1)
        .vote(0);

      const candidate =
        await voting.getCandidate(0);

      expect(
        candidate[1]
      ).to.equal(1);
  });

  it("Should prevent double voting",
    async function () {

      await voting.addCandidate("Alice");

      await voting
        .connect(voter1)
        .vote(0);

      await expect(
        voting
          .connect(voter1)
          .vote(0)
      ).to.be.revertedWith(
        "Already voted"
      );
  });

  it("Should reject invalid candidate",
    async function () {

      await expect(
        voting
          .connect(voter1)
          .vote(5)
      ).to.be.revertedWith(
        "Invalid candidate"
      );
  });

  it("Should reject non-owner adding candidate",
    async function () {

      await expect(
        voting
          .connect(voter1)
          .addCandidate("Bob")
      ).to.be.revertedWith(
        "Not owner"
      );
  });

  it("Should emit CandidateAdded event",
    async function () {

      await expect(
        voting.addCandidate("Alice")
      ).to.emit(
        voting,
        "CandidateAdded"
      );
  });

  it("Should emit Voted event",
    async function () {

      await voting.addCandidate("Alice");

      await expect(
        voting
          .connect(voter1)
          .vote(0)
      ).to.emit(
        voting,
        "Voted"
      );
  });

  it("Should return candidate count",
    async function () {

      await voting.addCandidate("Alice");

      await voting.addCandidate("Bob");

      expect(
        await voting.candidateCount()
      ).to.equal(2);
  });

  it("Should count votes from multiple voters",
    async function () {

      const [, voter1, voter2] =
        await ethers.getSigners();

      await voting.addCandidate("Alice");

      await voting
        .connect(voter1)
        .vote(0);

      await voting
        .connect(voter2)
        .vote(0);

      const candidate =
        await voting.getCandidate(0);

      expect(
        candidate[1]
      ).to.equal(2);
  });

  it("Should reject voting after deadline",
    async function () {

      const Voting =
        await ethers.getContractFactory(
          "SimpleVoting"
        );

      const latestBlock =
        await ethers.provider.getBlock(
          "latest"
        );

      const expiredDeadline =
        latestBlock.timestamp - 10;

      const expiredVoting =
        await Voting.deploy(
          expiredDeadline
        );

      await expiredVoting
        .waitForDeployment();

      await expiredVoting
        .addCandidate("Alice");

      await expect(
        expiredVoting
          .connect(voter1)
          .vote(0)
      ).to.be.revertedWith(
        "Voting ended"
      );
  });

});

