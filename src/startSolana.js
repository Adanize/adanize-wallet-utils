import * as Config from './config'

/**
 * Start Solana Phantom wallet
 * @returns mixed
 */
 export const solanaStartPhantom = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.solana]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.phantom,
                wallet_key: Config.WALLETS_SOLANA.phantom
            })
        }
		if (!window[Config.WINDOW_PARENT_WALLETS.solana].isPhantom) {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.phantom,
                wallet_key: Config.WALLETS_SOLANA.phantom
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.solana]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.solana].connect) !== "undefined") {
                        clearInterval(interval)
                        window[Config.WINDOW_PARENT_WALLETS.solana].connect().then((res) => {
                            resolve(window[Config.WINDOW_PARENT_WALLETS.solana])
                        }).catch((e) => {
                            if (e.code == 4001) {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.solana,
                                    wallet_key: Config.WALLETS_SOLANA.phantom
                                })
                            } else {
                                reject({
									...e,
									wallet_key: Config.WALLETS_SOLANA.phantom
								})
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.phantom,
                            wallet_key: Config.WALLETS_SOLANA.phantom
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.phantom,
                        wallet_key: Config.WALLETS_SOLANA.phantom
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};

/**
 * Start Solana Solflare wallet
 * @returns mixed
 */
 export const solanaStartSolflare = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.solflare]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.solflare,
                wallet_key: Config.WALLETS_SOLANA.solflare
            })
        }
		if (!window[Config.WINDOW_PARENT_WALLETS.solflare].isSolflare) {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.solflare,
                wallet_key: Config.WALLETS_SOLANA.solflare
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.solflare]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.solflare].connect) !== "undefined") {
                        clearInterval(interval)
                        window[Config.WINDOW_PARENT_WALLETS.solflare].connect().then((res) => {
							if (!res) {
								reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.solana,
                                    wallet_key: Config.WALLETS_SOLANA.solflare
                                })
							} else {
								resolve(window[Config.WINDOW_PARENT_WALLETS.solflare])
							}
                        }).catch((e) => {
                            reject({
								...e,
								wallet_key: Config.WALLETS_SOLANA.solflare
							})
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.solflare,
                            wallet_key: Config.WALLETS_SOLANA.solflare
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.solflare,
                        wallet_key: Config.WALLETS_SOLANA.solflare
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};