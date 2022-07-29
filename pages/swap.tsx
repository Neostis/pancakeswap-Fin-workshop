import React from "react";
import Navbar from "../components/Navbar";
// import SwapComponent from "../components/SwapComponent";
// import ViewSwap from "../view/ViewSwap";
const swap = () => {
  return (
    <div className="bg-bgtheme py-10 w-auto grid">
      {/* แก้grid for set width */}
      <div className="justify-self-center bg-blueWidget rounded-3xl ">
        <div className="w-96 rounded-lg  font-bold">
          <div>
            <div className="">
              <h1 className="px-5 text-textwhite">Swap</h1>
            </div>

            <div className="">
              <div className="py-2 flex-column w-auto grid text-textblack ">
                <input className="w-11/12 h-14 rounded-lg justify-self-center"></input>
              </div>
              <div className=" flex-column w-auto grid text-textblack ">
                <button
                  className="w-6 h-6 rounded-full justify-self-center
                       bg-textwhite hover:bg-bluesky outline outline-[#f3991c] absolute"
                >
                  ↓
                </button>
              </div>
              <div className="flex-column w-auto grid text-textblack">
                <input className="w-11/12 h-14 rounded-lg justify-self-center"></input>
              </div>
              <div className="py-4 flex-column w-auto grid text-textblack ">
                <button
                  className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton
       text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                >
                  Swap
                </button>
              </div>
              <div className="py-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
    </div>
  );
};

export default swap;
