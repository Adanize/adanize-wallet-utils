import * as Config from './config'

/**
 * Start Ethereum Metamask wallet
 * @returns mixed
 */
 export const ethereumMetamaskStart = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.ethereum]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.metamask,
                wallet_key: Config.WALLETS_ETHEREUM.metamask
            })
        }
		if (!window[Config.WINDOW_PARENT_WALLETS.ethereum].isMetaMask) {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.metamask,
                wallet_key: Config.WALLETS_ETHEREUM.metamask
            })
        }
        try {
            const interval = setInterval(async () => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.ethereum]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.ethereum].enable) !== "undefined") {
                        clearInterval(interval)


						let metamaskUnlocked = await window[Config.WINDOW_PARENT_WALLETS.ethereum]._metamask.isUnlocked()
						if (!metamaskUnlocked) {
							reject({
								code: -2,
								message: 'Your metamask is locked.',
								wallet_key: Config.WALLETS_ETHEREUM.metamask
							})
						}

                        window[Config.WINDOW_PARENT_WALLETS.ethereum].enable().then((res) => {
							if ( (typeof(res) == "string" || typeof(res) == "object") && res != '' ) {
								resolve(window[Config.WINDOW_PARENT_WALLETS.ethereum])
							} else {
								reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.ethereum,
                                    wallet_key: Config.WALLETS_ETHEREUM.metamask
                                })
							}
                        }).catch((e) => {
                            if (e.code == 4001) {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.ethereum,
                                    wallet_key: Config.WALLETS_ETHEREUM.metamask
                                })
                            } else {
                                reject({
									...e,
									wallet_key: Config.WALLETS_ETHEREUM.metamask
								})
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.metamask,
                            wallet_key: Config.WALLETS_ETHEREUM.metamask
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.metamask,
                        wallet_key: Config.WALLETS_ETHEREUM.metamask
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};

/**
 * Verify chain in metamask
 * @param {Web3} web3
 * @param {string} ethereumChain
 * @returns string
 */
 export const ethereumMetamaskVerifyChain = async(web3, ethereumChain) => {
	let chainFromWallet = await web3.eth.getChainId()

	let chains = {
		'eth': 1,
		'bsc': 56,
		'matic': 137
	}

	try {
		if (chainFromWallet !== chains[ethereumChain || 'eth']) {
			throw {
				message: `Your wallet is not on the main ${ethereumChain} network, change your network or enter the address manually.`
			}
		}
	} catch (error) {
		throw error
	}
 };