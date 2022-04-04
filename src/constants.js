

export const Chains = {/* 
    "0x4": {
        chainId: "0x4",
        chainName: "Rinkeby",
        rpcUrl: "https://rinkeby.infura.io/v3/",
        isADefault: true
    },  */
    "0x1": {
        chainId: "0x1",
        chainName: "Mainnet",
        rpcUrl: "https://mainnet.infura.io/v3/",
        isADefault: true
    },
    "0x89": {
        chainId: "0x89",
        chainName: "Polygon",
        rpcUrl: "https://polygon-rpc.com/",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
        isADefault: false
    },
    "0x38": {
        chainId: "0x38",
        chainName: "BSC",
        rpcUrl: "https://bsc-dataseed.binance.org",
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18
        },
        blockExplorerUrls: ["https://bscscan.com/"],
        isADefault: false
    },
    "0xfa": {
        chainId: "0xfa",
        chainName: "Fantom",
        rpcUrl: "https://rpc.ftm.tools/",
        nativeCurrency: {
            name: "FTM",
            symbol: "FTM",
            decimals: 18
        },
        blockExplorerUrls: ["https://ftmscan.com/"],
        isADefault: false
    },
    "0xa86a" : {
        chainId: "0xa86a",
        chainName: "Avalanche",
        rpcUrl: "https://rpc.ankr.com/avalanche",
        nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18
        },
        blockExplorerUrls: ["https://snowtrace.io/"],
        isADefault: false
    }
}