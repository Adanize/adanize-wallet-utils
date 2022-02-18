import * as wasm from '@emurgo/cardano-serialization-lib-asmjs'
import Web3Token from './resources/browser'
import { Buffer } from 'buffer'
import * as Web3 from 'web3'

import {
    startNami,
    startCCVault,
    startFlint,
    startGero,
    startYoroi,
    startTyphon,
    startCardwallet
} from './startCardano'

import {
    solanaStartPhantom,
    solanaStartSolflare
} from './startSolana'

import {
    ethereumMetamaskStart,
    ethereumMetamaskVerifyChain
} from './startEthereum'

const namiKey = "nami"
const ccvaultKey = "ccvault"
const geroKey = "gero"
const flintKey = "flint"
const typhonKey = "typhon"
const yoroiKey = "yoroi"
const cardwalletKey = "cardwallet"

const solanaPhantomKey = "phantom"
const solanaSolflareKey = "solflare"

const ethereumMetamaskKey = "metamask"

const messageCode2 = 'An error occurred during execution of this API call. One of the possible errors is that you do not have a selected account in your wallet. After verifying what happened, refresh this page and try again!'

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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
    } else if (wallet == typhonKey) {
        instance = await startTyphon()
    } else {
        return null
    }

    balance = await instance.getBalance()

    if (wallet == typhonKey) {
        return {
            locked: {
                decimal: 0,
                lovelace: 0
            },
            total: {
                decimal: 0,
                lovelace: 0
            },
            total_free: {
                decimal: int(balance.data.ada) / 1000000,
                lovelace: int(balance.data.ada)
            },
        };
    }

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
 * Return hex address from bech32 format
 * Compatible wallets: all
 * @param {*} data
 * @returns string
 */
 export const getAddressFromBech32ToHex = async(data) => {
	try {
		let addrHex = Buffer.from(
			wasm.Address.from_bech32(
				data
			).to_bytes(), 'hex'
		).toString('hex')

		return addrHex
	} catch (error) {
		return null
	}
};

/**
 * Get used address from wallets
 * Compatible wallets:
 *   Cardano: nami, ccvault, gero, flint, typhon, cardwallet, yoroi
 *   Ethereum/BSC/Polygon: metamask
 *   Solana: phantom, solflare
 * @param {string} wallet
 * @param {object} options
 * @returns mixed
 */
export const getUsedAddressString = async(wallet = 'nami', options = {}) => {
    let instance

	const {
		ethereumChain = null,
		ethereumGetAllAddresses = false
	} = options

    if (wallet == namiKey) {
        instance = await startNami()
    } else if (wallet == ccvaultKey) {
        instance = await startCCVault()
    } else if (wallet == geroKey) {
        instance = await startGero()
    } else if (wallet == flintKey) {
        instance = await startFlint()
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
    } else if (wallet == typhonKey) {
        // In Typhon the address is not returned as in CIP-0030, so it must be called differently
        instance = await startTyphon()
        let typhonAddr = await instance.getAddress()

        if (typeof(typhonAddr) === "object" && typeof(typhonAddr.data) !== "undefined") {
            if (typeof(typhonAddr.data) === "object") {
                return typhonAddr.data[0]
            } else {
                return typhonAddr.data || typhonAddr['data']
            }
        } else {
            return null
        }

	// Solana Wallets
    } else if (wallet == solanaPhantomKey) {
        instance = await solanaStartPhantom()
		return instance.publicKey.toString()
    } else if ( wallet == solanaSolflareKey) {
        instance = await solanaStartSolflare()
		return instance.publicKey.toString()

	// Ethereum Wallets
    } else if ( wallet == ethereumMetamaskKey) {
        instance = await ethereumMetamaskStart()
		let web3 = new Web3(instance)

		await ethereumMetamaskVerifyChain(web3, ethereumChain)

		let metamaskAddr = await web3.eth.requestAccounts()
		return ethereumGetAllAddresses ? metamaskAddr : metamaskAddr[0]
    } else {
        return null
    }

    let addrHex = await instance.getUsedAddresses()

    if (typeof(addrHex) === "object" && addrHex.length <= 0) {
        addrHex = await instance.getChangeAddress()
    }

    if (!addrHex) {
        addrHex = await instance.getChangeAddress()
    }

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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
    } else if (wallet == typhonKey) {
        // Typhon does not have the method getChangeAddress used in CIP-0030, so it returns the normal address
        instance = await getUsedAddressString('typhon')
        return instance
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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
    } else if (wallet == typhonKey) {
        // Typhon does not have the method getUnusedAddresses used in CIP-0030
        return null
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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
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
    } else if (wallet == typhonKey) {
        instance = await startTyphon()
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
    } else if (wallet == solanaPhantomKey) {
        return 'mainnet'
    } else if (wallet == solanaSolflareKey) {
        return 'mainnet'
    }  else if (wallet == ethereumMetamaskKey) {
        return 'mainnet'
    } else {
        return null
    }

    try {

		// In Yoroi, yet return only mainnet
		if (wallet == yoroiKey) {
			nw = 1
		} else {
			nw = await instance.getNetworkId()
		}

        // In Typhon the network is returned as an object inside the "data" key
        if (typeof(nw) === "object" && typeof(nw.data) !== "undefined") {
            nw = nw.data
        }
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
    } else if (wallet == yoroiKey) {
        instance = await startYoroi()
    } else if (wallet == typhonKey) {
        instance = await startTyphon()
    } else if (wallet == cardwalletKey) {
        instance = await startCardwallet()
    } else {
        return null
    }

    return instance
};