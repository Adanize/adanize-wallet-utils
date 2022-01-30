import * as wasm from '@emurgo/cardano-serialization-lib-asmjs'
import Web3Token from './browser'
import { Buffer } from 'buffer'

const namiKey = "nami"
const ccvaultKey = "ccvault"
const geroKey = "gero"
const flintKey = "flint"

const messageCode2 = 'An error occurred during execution of this API call. One of the possible errors is that you do not have a selected account in your wallet. After verifying what happened, refresh this page and try again!'

/**
 * Connect in Nami Wallet and return instance if success
 * @returns mixed
 */
export const startNami = async() => {
    let messageNotInstalled = 'The Nami Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo" target="_blank" class="font-bold">Install it</a>.'

    return await new Promise((resolve, reject) => {
        if (typeof(window.cardano) == "undefined") {
            reject({
                code: -10,
                message: messageNotInstalled,
                wallet_key: namiKey
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if ((typeof(window.cardano.nami) !== "undefined" && typeof(window.cardano.nami.enable) !== "undefined") || typeof(window.cardano.enable) !== "undefined") {
                        clearInterval(interval)

                        let instance

                        if (typeof(window.cardano.nami) !== "undefined" && typeof(window.cardano.nami.enable) !== "undefined") {
                            try {
                                instance = window.cardano.nami.enable()
                            } catch (e) {
                                if (e.code == -2) {
                                    reject({
                                        code: -2,
                                        message: messageCode2,
                                        wallet_key: namiKey
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
                            message: messageNotInstalled,
                            wallet_key: namiKey
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: messageNotInstalled,
                        wallet_key: namiKey
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
    let messageNotInstalled = 'The CCVault Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/ccvaultio/kmhcihpebfmpgmihbkipmjlmmioameka" target="_blank" class="font-bold">Install it</a>.'

    return await new Promise((resolve, reject) => {
        if (typeof(window.cardano) == "undefined") {
            reject({
                code: -10,
                message: messageNotInstalled,
                wallet_key: ccvaultKey
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window.cardano.ccvault) !== "undefined" && typeof(window.cardano.ccvault.enable) !== "undefined") {
                        clearInterval(interval)
                        window.cardano.ccvault.enable().then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: 'An error occurred during execution of this API call. At CCVault you may not have a selected account in your wallet or you may not have activated the DApp Account mode. If so, you can activate it by opening your wallet, clicking on the "Account" tab and then on "Enable DApp Account". After verifying what happened, refresh this page and try again!',
                                    wallet_key: ccvaultKey
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: messageNotInstalled,
                            wallet_key: ccvaultKey
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: messageNotInstalled,
                        wallet_key: ccvaultKey
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
    let messageNotInstalled = 'The Flint Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/flint/hnhobjmcibchnmglfbldbfabcgaknlkj" target="_blank" class="font-bold">Install it</a>.'

    return await new Promise((resolve, reject) => {
        if (typeof(window.cardano) == "undefined") {
            reject({
                code: -10,
                message: messageNotInstalled,
                wallet_key: flintKey
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window.cardano.flint) !== "undefined" && typeof(window.cardano.flint.enable) !== "undefined") {
                        clearInterval(interval)
                        window.cardano.flint.enable().then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: messageCode2,
                                    wallet_key: flintKey
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: messageNotInstalled,
                            wallet_key: flintKey
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: messageNotInstalled,
                        wallet_key: flintKey
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
    let messageNotInstalled = 'The Gero Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe" target="_blank" class="font-bold">Install it</a>.'

    return await new Promise((resolve, reject) => {
        if (typeof(window.cardano) == "undefined") {
            reject({
                code: -10,
                message: messageNotInstalled,
                wallet_key: geroKey
            })
        }
        try {
            const interval = setInterval(() => {
                try {
                    if (typeof(window.cardano.gerowallet) !== "undefined" && typeof(window.cardano.gerowallet.enable) !== "undefined") {
                        clearInterval(interval)
                        window.cardano.gerowallet.enable().then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            if (e.code == -2) {
                                reject({
                                    code: -2,
                                    message: messageCode2,
                                    wallet_key: geroKey
                                })
                            } else {
                                reject(e)
                            }
                        })
                    } else {
                        clearInterval(interval)
                        reject({
                            code: -10,
                            message: messageNotInstalled,
                            wallet_key: flintKey
                        })
                    }
                } catch (error) {
                    clearInterval(interval)
                    reject({
                        code: -10,
                        message: messageNotInstalled,
                        wallet_key: flintKey
                    })
                }
            }, 500)
        } catch (error) {
            reject(e)
        }
    });
};

/**
 * Return the balance string with base on wallet
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {string} wallet
 * @returns string
 */
export const getBalanceString = async(wallet = "nami") => {
    let instance, balance

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    balance = await instance.getBalance()
    return balance
};

/**
 * Lists all NFTs in a wallet
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {*} wallet
 * @returns object
 */
export const getNfts = async(wallet = "nami") => {
    let instance, balance

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    balance = await instance.getBalance()

    let assetList = [];
    let data = wasm.Value.from_bytes(Buffer.from(balance, "hex"))

    let allAssets = data.multiasset();
    let assetTypes = allAssets.keys();
    for (var i = 0; i < assetTypes.len(); i++) {
        let policyId = assetTypes.get(i);
        let assets = allAssets.get(policyId);
        let assetNames = assets.keys();
        for (var x = 0; x < assetNames.len(); x++) {
            let assetName = assetNames.get(x);
            let asset = assets.get(assetName);
            let policyHex = Buffer.from(policyId.to_bytes()).toString('hex');
            let assetHex = Buffer.from(assetName.name()).toString('hex');
            assetList.push({
                token: policyHex + assetHex,
                asset_hex: assetHex,
                asset_name: Buffer.from(assetHex, "hex").toString(),
                policy_id: policyHex,
                qty: Number(asset.to_str())
            })
        }
    }

    return assetList
};

/**
 * Search for NFTs in the wallet
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {*} wallet
 * @param {string} query data to be fetched, using % at the start will search for any record that contains the data.
 * @param {string} type name of column to be searched: token, asset_hex, asset_name, policy_id
 * @returns object
 */
export const searchNft = async(wallet = "nami", query, type = "policy_id") => {
    let instance, balance

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    balance = await instance.getBalance()

    let nfts = []
    try {
        nfts = await getNfts(wallet)
    } catch (error) {
        nfts = []
    }

    nfts = nfts.filter((item) => {
        if (query.indexOf("%") > -1) {
            return item[type].toLowerCase().indexOf(query.split("%")[1].toLowerCase()) > -1
        } else {
            return item[type].toLowerCase() == query.toLowerCase()
        }
    })

    return nfts
};

/**
 * Returns the total in the wallet
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {*} wallet
 * @returns object
 */
export const getTotalInWallet = async(wallet = "nami") => {
    let instance, balance

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    balance = await instance.getBalance()

    const value = wasm.Value.from_bytes(Buffer.from(balance, "hex"))
    const locked = wasm.min_ada_required(value, wasm.BigNum.from_str('1000000'))
    const int = (value) => Number(value.to_str());
    const result = int(value.coin()) - int(locked);

    return {
        locked: {
            decimal: int(locked) / 1000000,
            lovelace: int(locked)
        },
        total: {
            decimal: int(value.coin()) / 1000000,
            lovelace: int(value.coin())
        },
        total_free: {
            decimal: result / 1000000,
            lovelace: result
        },
    };
};

/**
 * Returns formatted address, ready to use
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {*} data result from: wallet.getUsedAddresses, wallet.getUnusedAddresses, wallet.getChangeAddress, wallet.getRewardAddresses
 * @returns string
 */
export const getAddressString = async(data) => {
    let addrString = typeof(data) == "object" ? data[0] : data
    const addr = wasm.Address.from_bytes(Buffer.from(addrString, "hex"))
    return addr.to_bech32()
};

/**
 * Get only one used address
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {string} wallet
 * @returns mixed
 */
export const getUsedAddressString = async(wallet = 'nami') => {
    let instance

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    let addrHex = await instance.getUsedAddresses()
    let addr = await getAddressString(addrHex)
    return addr
};

/**
 * Get only one change address
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {string} wallet
 * @returns mixed
 */
export const getChangeAddressString = async(wallet = 'nami') => {
    let instance

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    let addrHex = await instance.getChangeAddress()
    let addr = await getAddressString(addrHex)
    return addr
};

/**
 * Get only one unused address
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {string} wallet
 * @returns mixed
 */
export const getUnusedAddressString = async(wallet = 'nami') => {
    let instance

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    let addrHex = await instance.getUnusedAddresses()

    if (addrHex.length <= 0) {
        return null
    }

    let addr = await getAddressString(addrHex)
    return addr
};

/**
 * Get only one reward address
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {string} wallet
 * @returns mixed
 */
export const getRewardAddressString = async(wallet = 'nami') => {
    let instance, addrHex

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    try {
        addrHex = await instance.getRewardAddress()
    } catch (error) {
        try {
            addrHex = await instance.getRewardAddresses()
        } catch (error) {
            return null
        }
    }

    let addr = await getAddressString(addrHex)
    return addr
};

/**
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {string} wallet
 * @param {string} message
 * @param {object} body
 * @param {string} days
 * @returns string
 */
export const getTokenAuth = async(wallet = 'nami', message = "Login with Wallet", body = {}, days = "7300") => {
    let instance, addrHex

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    try {
        addrHex = await instance.getRewardAddress()
    } catch (error) {
        try {
            addrHex = await instance.getRewardAddresses()
        } catch (error) {
            return null
        }
    }

    if (typeof(addrHex) == "object") {
        addrHex = addrHex[0]
    }

    const token = await Web3Token.sign(msg => instance.signData(addrHex, Buffer.from(message, 'ascii').toString('hex')), days + 'd', body);

    return token
};

/**
 * Returns the name of which network the wallet is using
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {*} wallet
 * @returns string
 */
export const getNetworkString = async(wallet = "nami") => {
    let instance, nw

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    try {
        nw = await instance.getNetworkId()
    } catch (error) {
        return
    }

    let network = ["testnet", "mainnet"]
    return network[nw]
};

/**
 * Extend wallet methods
 * Compatible wallets: nami, ccvault, gero, flint, typhon
 * @param {string} wallet
 * @returns mixed
 */
export const extend = async(wallet = "nami") => {
    let instance

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else {
        return null
    }

    return instance
};