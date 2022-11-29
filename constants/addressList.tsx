export const CONTRACT_ADDRESS = {
  FACTORY: "0x1858F08ce7425B2715d870c20e0e2c79899994aa",
  ROUTER: "0x500b47A2470175D81eB37295EF7a494bED33F889",
  Multicall: "0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821",
};
export const CONTRACT_NAMES = Object.entries(CONTRACT_ADDRESS).reduce<
  Record<string, string>
>((prev, cur) => {
  const [name, address]: any = cur;
  prev[address] = name;
  return prev;
}, {});

export const ADDRESS_LIST: Record<string, string> = {
  ...CONTRACT_ADDRESS,
  ...Object.values(CONTRACT_ADDRESS).reduce<Record<string, string>>(
    (prev, cur: any) => {
      prev[cur] = cur;
      return prev;
    },
    {}
  ),
};

export const PAIR_ADDRESS = [
  "0x396aCf468CC9d44b10A669Fa50A194435FCF05F5",
  "0xAF966C9B55c71919d2c800232ea83E5baB89Be4E",
  "0x8620bd005f8979Dd300118101136284a7F30fE21",
  "0xc10F159bfDa35b7eA7f3B88f432cCdA26C63d7C8",
  "0xC96fF23AA569BE6adD743762A01CCDD101fa3c87",
  "0x9f10cf10F492CC38d1Ca938a7fE206f6Da13D6f3",
  "0x1E380722acb460D995558F88b43597Da39f02af2",
]


