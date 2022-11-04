require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./task/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("@nomiclabs/hardhat-etherscan")
/** @type import('hardhat/config').HardhatUserConfig */
GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https/eth-goerli/example"
MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "0xf3"
PRIVATE_KEY = process.env.PRIVATE_KEY || "3fg"
ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "68fg"
COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "3fgg"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },

        mumbai: {
            url: MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "Matic",
    },
}
