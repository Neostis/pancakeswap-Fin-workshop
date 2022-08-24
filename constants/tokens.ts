// tokenList for Select
export const ETH_TOKENS = [
  {
    name: 'A Coin',
    symbol: 'AC',
    decimals: 18,
    imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723',
  },
  {
    name: 'B Coin',
    symbol: 'BC',
    decimals: 18,
    imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
    address: '0x1089DcF6B59912a0ff8c250383E47F5c0e0be4fb',
  },
  {
    name: 'C Coin',
    symbol: 'CC',
    decimals: 18,
    imageUrl: 'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    address: '0xcc0Cb628E826F557E2273EC3412e370B474b9120',
  },
  {
    name: 'D Coin',
    symbol: 'DC',
    decimals: 18,
    imageUrl: 'https://cryptologos.cc/logos/aelf-elf-logo.png?v=002',
    address: '0x65Fe4b1ea18b548AeAEb9b9AEA21732AC34c717B',
  },
  {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    imageUrl: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png?v=023',
    address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  },
];
export const PairsList = [
  {
    addressPair: '0x396aCf468CC9d44b10A669Fa50A194435FCF05F5',
    token0: {
      name: 'A Coin',
      symbol: 'AC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
      address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723',
    },
    token1: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png?v=023',
      address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    },
  },
  {
    addressPair: '0xAF966C9B55c71919d2c800232ea83E5baB89Be4E',
    token0: {
      name: 'B Coin',
      symbol: 'BC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
      address: '0x1089DcF6B59912a0ff8c250383E47F5c0e0be4fb',
    },
    token1: {
      name: 'A Coin',
      symbol: 'AC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
      address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723',
    },
  },
  {
    addressPair: '0x8620bd005f8979Dd300118101136284a7F30fE21',
    token0: {
      name: 'A Coin',
      symbol: 'AC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
      address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723',
    },
    token1: {
      name: 'C Coin',
      symbol: 'CC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
      address: '0xcc0Cb628E826F557E2273EC3412e370B474b9120',
    },
  },
  {
    addressPair: '0xc10F159bfDa35b7eA7f3B88f432cCdA26C63d7C8',
    token0: {
      name: 'D Coin',
      symbol: 'DC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/aelf-elf-logo.png?v=002',
      address: '0x65Fe4b1ea18b548AeAEb9b9AEA21732AC34c717B',
    },
    token1: {
      name: 'C Coin',
      symbol: 'CC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
      address: '0xcc0Cb628E826F557E2273EC3412e370B474b9120',
    },
  },
  {
    addressPair: '0xC96fF23AA569BE6adD743762A01CCDD101fa3c87',
    token0: {
      name: 'A Coin',
      symbol: 'AC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
      address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723',
    },
    token1: {
      name: 'D Coin',
      symbol: 'DC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/aelf-elf-logo.png?v=002',
      address: '0x65Fe4b1ea18b548AeAEb9b9AEA21732AC34c717B',
    },
  },
  {
    addressPair: '0x9f10cf10F492CC38d1Ca938a7fE206f6Da13D6f3',
    token0: {
      name: 'B Coin',
      symbol: 'BC',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
      address: '0x1089DcF6B59912a0ff8c250383E47F5c0e0be4fb',
    },
    token1: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      imageUrl: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png?v=023',
      address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    },
  },
];
//
export const getTokenPairsDetails = (addrToken: string) => {
  return (
    {
      '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723': {
        name: 'A Coin',
        symbol: 'AC',
        decimals: 18,
        imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
        address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723',
      },
      '0x1089DcF6B59912a0ff8c250383E47F5c0e0be4fb': {
        name: 'B Coin',
        symbol: 'BC',
        decimals: 18,
        imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
        address: '0x1089DcF6B59912a0ff8c250383E47F5c0e0be4fb',
      },
      '0xcc0Cb628E826F557E2273EC3412e370B474b9120': {
        name: 'C Coin',
        symbol: 'CC',
        decimals: 18,
        imageUrl: 'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
        address: '0xcc0Cb628E826F557E2273EC3412e370B474b9120',
      },
      '0x65Fe4b1ea18b548AeAEb9b9AEA21732AC34c717B': {
        name: 'D Coin',
        symbol: 'DC',
        decimals: 18,
        imageUrl: 'https://cryptologos.cc/logos/aelf-elf-logo.png?v=002',
        address: '0x65Fe4b1ea18b548AeAEb9b9AEA21732AC34c717B',
      },
      '0xc778417E063141139Fce010982780140Aa0cD5Ab': {
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        imageUrl: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png?v=023',
        address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      },
    }[addrToken || ''] || addrToken
  );
};

export const getAllPairsDetail = (addrToken: string) => {
  return (
    {
      '0x396aCf468CC9d44b10A669Fa50A194435FCF05F5': {
        token0: '0x3485ebf13d8292e8c78f442bc4eb198d47f58723',
        token1: '0xc778417e063141139fce010982780140aa0cd5ab',
      },
      '0xAF966C9B55c71919d2c800232ea83E5baB89Be4E': {
        token0: '0x1089dcf6b59912a0ff8c250383e47f5c0e0be4fb',
        token1: '0x3485ebf13d8292e8c78f442bc4eb198d47f58723',
      },
      '0xcc0Cb628E826F557E2273EC3412e370B474b9120': {
        token0: '0x3485ebf13d8292e8c78f442bc4eb198d47f58723',
        token1: '0xcc0cb628e826f557e2273ec3412e370b474b9120',
      },
      '0xc10F159bfDa35b7eA7f3B88f432cCdA26C63d7C8': {
        token0: '0x65fe4b1ea18b548aeaeb9b9aea21732ac34c717b',
        token1: '0xcc0cb628e826f557e2273ec3412e370b474b9120',
      },
    }[addrToken || ''] || addrToken
  );
};
