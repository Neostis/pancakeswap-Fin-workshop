import React, { useState } from 'react';
import AddLiquidityModule from '../components/AddLiquidityModule';
import { ModuleType } from '../types/module.type';
import Popup from '../components/popup';

export default function add() {
  // const [selectedModule, setSelectedModule] = useState<ModuleType>('idle');
  // const [selectedAccount, setSelectedAccount] = useState('');
  // // setSelectedModule("idle")

  // const setSelected = (module: ModuleType, account: string) => {
  //   setSelectedModule(module);
  //   setSelectedAccount(account);
  // };

  // const renderTitle = () => {
  //   switch (selectedModule) {
  //     case 'pairLiquidity':
  //       return 'Pair Token:';
  //     default:
  //       return 'Choose';
  //   }
  // };

  // const renderModule = () => {
  //   switch (selectedModule) {
  //     // case 'pairLiquidity':
  //     //   return <AddLiquidityModule setModule={setSelectedModule} />;
  //     default:
  //       return (
  //         <>
  //           <AddLiquidityModule setModule={setSelectedModule} account={selectedAccount} />
  //         </>
  //       );
  //   }
  // };

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event: any) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  return (
    <div className="items-center">
      Add Liquidity
      <br />
      <h3>
        <label className="to-blue">test 1</label>
      </h3>
      <br />
      <h3>
        <label className="to-blue"> test 2</label>
      </h3>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700"
        onClick={handleClick}
      >
        Approve
      </button>
      {isShown && <div></div>}
      {isShown && <Popup />}
    </div>
  );
}
