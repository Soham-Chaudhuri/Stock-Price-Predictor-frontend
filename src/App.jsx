import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import StockCharts from "./components/StockCharts";
const App = () => {
  
  return (
    <>
      <div className="main-bg w-full lg:min-h-screen min-h-[130vh] bg-zinc-800 text-white p-10 flex-col space-y-4">
        <Navbar/>
        <StockCharts/>
      </div>
    </>
  );
};

export default App;
