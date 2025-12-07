/**
 * Contract addresses deployed on Flare Testnet (Coston2)
 * Chain ID: 114
 */

export const CONTRACTS = {
  // Core Contracts
  MARKET: "0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38",
  MARKET_UTILS_SWAP_HOOK: "0x955b741592FAF9388BEC58D25A6aC8B0Cd9c00c0",
  BASIC_RESOLVER: "0x3fEa484D7E954D13811ED91721112239F7435898",
  FLARE_HYBRID_RESOLVER: "0x23294167cDB8041d6b15FA9eb7E1bB3A962ea015",
  USDC: "0xb34e3Dfd595cD28aD15D76dCA86eF7D54b772Db5",

  // Uniswap V4 Infrastructure
  POOL_MANAGER: "0x9A9bc340103C462365Db54E423f95784C664d3Df",
  POSITION_MANAGER: "0xf25592fbe1597E58E5235a6A309a83ce3d8b5bfe",
  UNIVERSAL_ROUTER: "0x2b45002683704d4d14CB5D979a4C93d02844884a",
  PERMIT2: "0xC5052054DBDC35f84D279CB321bE98480d807f6F",
  WFLR: "0xF6398711b650CD1C0601f0c03d4E3f8C461c9AA0",

  // Flare Infrastructure
  FTSO_REGISTRY: "0x48Da21ce34966A64E267CeFb78012C0282D0Ac87",
  FDC: "0x48aC463d7975828989331F4De43341627b9c5f1D",
} as const;

export const CHAIN_CONFIG = {
  id: 114,
  name: "Flare Testnet (Coston2)",
  network: "flare-coston2",
  nativeCurrency: {
    decimals: 18,
    name: "Flare",
    symbol: "FLR",
  },
  rpcUrls: {
    default: {
      http: ["https://coston2-api.flare.network/ext/C/rpc"],
    },
    public: {
      http: ["https://coston2-api.flare.network/ext/C/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Coston2 Explorer",
      url: "https://coston2-explorer.flare.network",
    },
  },
  testnet: true,
} as const;

