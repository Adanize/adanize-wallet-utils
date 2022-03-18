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

/**
 * Connect in Flint and return instance if success
 * @returns mixed
 */
 export const startFlint = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.flint,
                wallet_key: Config.WALLETS_CARDANO.flint
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.flint]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.flint].enable) !== "undefined") {
                        clearInterval(interval)
                        window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.flint].enable().then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.default,
                                    wallet_key: Config.WALLETS_CARDANO.flint
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.flint,
                            wallet_key: Config.WALLETS_CARDANO.flint
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.flint,
                        wallet_key: Config.WALLETS_CARDANO.flint
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};

/**
 * Connect in Gero Wallet and return instance if success
 * @returns mixed
 */
 export const startGero = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.gero,
                wallet_key: Config.WALLETS_CARDANO.gero
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.gero]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.gero].enable) !== "undefined") {
                        clearInterval(interval)
                        window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.gero].enable().then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.default,
                                    wallet_key: Config.WALLETS_CARDANO.gero
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.gero,
                            wallet_key: Config.WALLETS_CARDANO.gero
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.gero,
                        wallet_key: Config.WALLETS_CARDANO.gero
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};

/**
 * Connect in Yoroi Wallet and return instance if success
 * @returns mixed
 */
 export const startYoroi = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.yoroi,
                wallet_key: Config.WALLETS_CARDANO.yoroi
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.yoroi]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.yoroi].enable) !== "undefined") {
                        clearInterval(interval)
                        window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.yoroi].enable().then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.default,
                                    wallet_key: Config.WALLETS_CARDANO.yoroi
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.yoroi,
                            wallet_key: Config.WALLETS_CARDANO.yoroi
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.yoroi,
                        wallet_key: Config.WALLETS_CARDANO.yoroi
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};

/**
 * Connect in Typhon Wallet and return instance if success
 * @returns mixed
 */
 export const startTyphon = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.typhon,
                wallet_key: Config.WALLETS_CARDANO.typhon
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.typhon]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.typhon].enable) !== "undefined") {
                        clearInterval(interval)
                        window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.typhon].enable().then((res) => {
                            if (res.status) {
                                resolve(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.typhon])
                            } else {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.default,
                                    wallet_key: Config.WALLETS_CARDANO.typhon
                                })
                            }
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.default,
                                    wallet_key: Config.WALLETS_CARDANO.typhon
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.typhon,
                            wallet_key: Config.WALLETS_CARDANO.typhon
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.typhon,
                        wallet_key: Config.WALLETS_CARDANO.typhon
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};

/**
 * Connect in CardWallet and return instance if success
 * @returns mixed
 */
export const startCardwallet = async() => {
    return await new Promise((resolve, reject) => {
        if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano]) == "undefined") {
            reject({
                code: -10,
                message: Config.MESSAGES.notInstalled.cardwallet,
                wallet_key: Config.WALLETS_CARDANO.cardwallet
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.cardwallet]) !== "undefined" && typeof(window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.cardwallet].enable) !== "undefined") {
                        clearInterval(interval)
                        window[Config.WINDOW_PARENT_WALLETS.cardano][Config.WALLETS_CARDANO.cardwallet].enable().then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: Config.MESSAGES.code2.default,
                                    wallet_key: Config.WALLETS_CARDANO.cardwallet
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: Config.MESSAGES.notInstalled.cardwallet,
                            wallet_key: Config.WALLETS_CARDANO.cardwallet
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: Config.MESSAGES.notInstalled.cardwallet,
                        wallet_key: Config.WALLETS_CARDANO.cardwallet
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};