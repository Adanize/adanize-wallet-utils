import * as Web3 from 'web3'

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
            let metamaskUnlocked

            const interval = setInterval(async () => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.ethereum]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.ethereum].enable) !== "undefined") {
                        clearInterval(interval)

                        window[Config.WINDOW_PARENT_WALLETS.ethereum].request({ method: 'eth_requestAccounts' }).then((res) => {
							if ( ( typeof(res) == "string" || typeof(res) == "object") && res != '' && res.length > 0 ) {
                                let web3 = new Web3(window[Config.WINDOW_PARENT_WALLETS.ethereum])
								resolve(web3)
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

export const ethereumMetamaskVerifyIsLocked = async() => {
    let metamaskUnlocked = await window[Config.WINDOW_PARENT_WALLETS.ethereum]._metamask.isUnlocked()
    if (!metamaskUnlocked) {
        throw {
            code: -2,
            message: 'Your metamask is locked. If you already unlocked your wallet, maybe it necessary refresh this page.',
            wallet_key: 'metamask'
        }
    }
}