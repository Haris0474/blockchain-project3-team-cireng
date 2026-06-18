async function main() {

  const deadline =
    Math.floor(Date.now() / 1000) + 86400;

  const Voting =
    await ethers.getContractFactory(
      "SimpleVoting"
    );

  const voting =
    await Voting.deploy(deadline);

  await voting.waitForDeployment();

  console.log(
    "Contract deployed to:",
    await voting.getAddress()
  );
  console.log("Deadline =", deadline);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});