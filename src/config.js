export const WINDOW_PARENT_WALLETS = {
    cardano: 'cardano',
    ethereum: 'ethereum',
    solana: 'solana',
    solflare: 'solflare',
};

export const WALLETS_CARDANO = {
    nami: 'nami',
    ccvault: 'ccvault',
    gero: 'gero',
    flint: 'flint',
    typhon: 'typhon',
    yoroi: 'yoroi',
    cardwallet: 'cardwallet',
};

export const WALLETS_ETHEREUM = {
    metamask: 'metamask',
};

export const WALLETS_SOLANA = {
    phantom: 'phantom',
    solflare: 'solflare',
};

export const MESSAGES = {
    code2: {
        default: 'An error occurred during execution of this API call. One of the possible errors is that you do not have a selected account in your wallet. After verifying what happened, refresh this page and try again!',
        ccvault: 'An error occurred during execution of this API call. At CCVault you may not have a selected account in your wallet or you may not have activated the DApp Account mode. If so, you can activate it by opening your wallet, clicking on the "Account" tab and then on "Enable DApp Account". After verifying what happened, refresh this page and try again!'
    },
    notInstalled: {
        nami: 'The Nami Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo" target="_blank" class="font-bold">Install it</a>.',
        ccvault: 'The CCVault Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/ccvaultio/kmhcihpebfmpgmihbkipmjlmmioameka" target="_blank" class="font-bold">Install it</a>.',
        flint: 'The Flint Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/flint/hnhobjmcibchnmglfbldbfabcgaknlkj" target="_blank" class="font-bold">Install it</a>.',
        gero: 'The Gero Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe" target="_blank" class="font-bold">Install it</a>.',
    }
};