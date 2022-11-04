const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying...........")
    const simpleStorage = await SimpleStorageFactory.deploy()
    //await simpleStorage.deployed()

    console.log(`deployed contract to: ${simpleStorage.address}`)
    
    console.log(network.config.chainId, process.env.ETHERSCAN_API_KEY)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedNumber = await simpleStorage.retrieve()
    console.log(`Updated bnumber is: ${updatedNumber}`)
}
async function verify(contractAddress, args) {
    console.log("verifying contract....")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgumments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exitCode(1)
    })
