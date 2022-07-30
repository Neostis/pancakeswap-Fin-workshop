import React from 'react';
import Link from 'next/link';

const addLiquidity = () => {
  return (
    <div className=" place-items-center ">
      <div className="  bg-blue-100 max-w-xs place-items-center ">
        <label className="block text-gray-700 text-sm font-bold mb-2">Liquidity</label>
        <h1>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700">
            <Link href="/add">Add Liquidity</Link>
          </button>
        </h1>

        <h3>
          <label className="block text-gray-700 text-sm font-bold mb-2">Your Liquidity</label>
        </h3>

        <h3>
          <label className="to-blue"></label>
        </h3>
      </div>
    </div>
  );
};

export default addLiquidity;
