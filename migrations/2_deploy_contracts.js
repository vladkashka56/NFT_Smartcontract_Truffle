const WrappedOrdinals = artifacts.require("WrappedOrdinals");
const Haiku = artifacts.require("Haiku");

const NetworkTypes = {
  "mainnet": "mainnet",
  "polygon": "polygon",
  "goerli": "goerli",
}

const treasurer = {
  "mainnet": process.env.mainnetTreasuryAddress,
  "polygon": process.env.polygonTreasuryAddress,
  "goerli": process.env.goerliTreasuryAddress,
}

module.exports = async function (deployer) {
  const networkType = NetworkTypes[process.argv[4]];

  if (!networkType)
    return console.error(process.argv[4] + " was not found in the networkType list");

  // console.log("Treasury is", treasurer[networkType]);

  // if (!treasurer[networkType])
  //   return console.error("Treasury address not valid");

  console.log("Deploying on the " + networkType + " networkType");



  //////////////////////////// Ordinal ////////////////////////////
  // await deployer.deploy(WrappedOrdinals, treasurer[networkType]);
  await deployer.deploy(Haiku, "0x74B26f39F91A376714E2dF12A8A7201Fb2f67fE6", "Haiku", "HAK", "0x74B26f39F91A376714E2dF12A8A7201Fb2f67fE6", 5);
//////////////////////////////////////////////////////////////////////////

  console.log(" \"Haiku\": " + "\"" + Haiku.address + "\",")

  // console.log("*******************************")
  // console.log("Treasury: ", treasurer[networkType]);
  // console.log("Deploying on the " + networkType + " networkType");
  // console.log("*******************************")
  // console.log("\"" + networkType + "\": {");
  // console.log(" \"WrappedOrdinals\": " + "\"" + WrappedOrdinals.address + "\",")
  // console.log("}");
  // console.log("*******************************")
};
