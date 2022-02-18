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
        ccvault: 'An error occurred during execution of this API call. At CCVault you may not have a selected account in your wallet or you may not have activated the DApp Account mode. If so, you can activate it by opening your wallet, clicking on the "Account" tab and then on "Enable DApp Account". After verifying what happened, refresh this page and try again!',
        solana: 'You have refused our site to connect to your wallet. To use the system it is necessary that you give us this permission. We remind you that at no time may we carry out transactions on your behalf without your consent.',
    },
    notInstalled: {
        nami: 'The Nami Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo" target="_blank" class="font-bold">Install it</a>.',
        ccvault: 'The CCVault Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/ccvaultio/kmhcihpebfmpgmihbkipmjlmmioameka" target="_blank" class="font-bold">Install it</a>.',
        flint: 'The Flint Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/flint/hnhobjmcibchnmglfbldbfabcgaknlkj" target="_blank" class="font-bold">Install it</a>.',
        gero: 'The Gero Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe" target="_blank" class="font-bold">Install it</a>.',
        yoroi: 'The Yoroi Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb" target="_blank" class="font-bold">Install it</a>.',
        typhon: 'The Typhon Wallet extension does not seem to be installed on your browser. <a href="https://typhonwallet.io/#/download" target="_blank" class="font-bold">Install it</a>.',
        cardwallet: 'The CardWallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/cardwallet/apnehcjmnengpnmccpaibjmhhoadaico" target="_blank" class="font-bold">Install it</a>.',
        phantom: 'The Phantom Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" target="_blank" class="font-bold">Install it</a>.',
        solflare: 'The Solflare Wallet extension does not seem to be installed on your browser. <a href="https://chrome.google.com/webstore/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic" target="_blank" class="font-bold">Install it</a>.',
    }
};