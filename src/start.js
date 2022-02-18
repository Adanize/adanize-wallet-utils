import * as Config from './config'

/**
 * Connect in Nami Wallet and return instance if success
 * @returns mixed
 */
export const startNami = async () => {
    return await new Promise((resolve, reject) => {
        if (typeof (window[Config.WINDOW_PARENT_WALLETS.cardano]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.nami,
                wallet_key: Config.WALLETS_CARDANO.nami
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if ((typeof (window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.nami]) !== "undefined" && typeof (window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.nami].enable) !== "undefined") || typeof (window[Config.WINDOW_PARENT_WALLETS.cardano].enable) !== "undefined") {
                        clearInterval(interval)

                        let instance

                        if (typeof (window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.nami]) !== "undefined" && typeof (window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.nami].enable) !== "undefined") {
                            try {
                                instance = window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.nami].enable()
                            } catch (e) {
                                if (e.code == -2) {
                                    reject({
                                        code: -2,
                                        message: Config.MESSAGES.code2.default,
                                        wallet_key: Config.WALLETS_CARDANO.nami
                                    })
                                } else {
                                    reject(e)
                                }
                            }
                        } else {
                            try {
                                instance = window.cardano.enable()
                            } catch (error) {
                                reject(e)
                            }
                        }

                        instance.then((res) => {
                            resolve(res === true ? window.cardano : res)
                        }).catch((e) => {
                            reject(e)
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.nami,
                            wallet_key: Config.WALLETS_CARDANO.nami
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.nami,
                        wallet_key: Config.WALLETS_CARDANO.nami
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};

/**
 * Connect in CCVault and return instance if success
 * @returns mixed
 */
 export const startCCVault = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.ccvault,
                wallet_key: Config.WALLETS_CARDANO.ccvault
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.ccvault]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.ccvault].enable) !== "undefined") {
                        clearInterval(interval)
                        window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.ccvault].enable().then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.ccvault,
                                    wallet_key: Config.WALLETS_CARDANO.ccvault
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.ccvault,
                            wallet_key: Config.WALLETS_CARDANO.ccvault
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.ccvault,
                        wallet_key: Config.WALLETS_CARDANO.ccvault
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};