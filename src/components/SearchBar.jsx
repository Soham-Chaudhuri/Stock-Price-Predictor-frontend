import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ApexChart from "./ApexChart";
import PredictForm from "./PredictForm";

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [stockOption, setStockOption] = useState(null);
  const [apexCharData, setApexChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://stock-price-predictor-2-0-backend.onrender.com/suggestData");
      //   console.log(response.data);
      setItems(response.data);
    };
    fetchData();
  }, []);
  // const convertTime = (data)=>{
  //   data.forEach((element) => {

  //   });
  // }
  useEffect(() => {
    if (stockOption) {
      const fetchChartData = async () => {
        try {
          const response = await axios.post(
            "https://stock-price-predictor-2-0-backend.onrender.com/getChartData",
            stockOption,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // console.log(response.data);
          // convertTime(response.data.data);
          setApexChartData(response.data.data);
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      };
      scrollToTop();
      fetchChartData();
    }
  }, [stockOption]);
  const handleOnSearch = (string, results) => {
    // console.log(string, results);
  };

  const handleOnHover = (item) => {
    // console.log("Item hovered:", item);
  };

  const handleOnSelect = (item) => {
    // console.log("Item selected:", item);
    setStockOption(item);
  };
  const changeView = () => {
    scrollToTop();
    setStockOption(null);
    setApexChartData(null);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {!stockOption && (
        <>
          <div className="text-center pt-20 py-6">
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Stocks Predictor
            </h1>
            <p class="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Here the predictor can predict the closing price of the stock
              according to the real life trend with nearly 96% accuracy
            </p>
            <p class=" text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Our Database contains data of some of the top searched stocks on
              the internet from 2010-2022
            </p>
          </div>
          <div className="max-w-md mx-auto mb-2 text-sm font-medium text-white">
            <ReactSearchAutocomplete
              items={items}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              autoFocus
              required
              placeholder="Search for stocks...."
              styling={{
                backgroundColor: "#52525b",
                iconColor: "white",
                color: "white",
                hoverBackgroundColor: "none",
                cursor: "pointer",
              }}
              className="cursor-pointer"
            />
          </div>
        </>
      )}
      {stockOption&&!apexCharData&&(
        <div className="text-center h-screen">
        <h1 class="mb-4 relative top-1/3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Loading Data...
      </h1>
        </div>
      )}
      {stockOption && apexCharData && (
        <>
          <div className="py-10 text-center">
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              {stockOption["name"]} Stock Data
            </h1>
          </div>
          <ApexChart data={apexCharData} />
          <PredictForm data={stockOption} />
          <form class="lg:w-3/5 mx-auto ">
            <div class="mb-5 space-y-5">
              <div className=" w-fit mx-auto">
                <button
                  type="submit"
                  class="text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
                  onClick={changeView}
                >
                  Select Another Stock
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default SearchBar;
