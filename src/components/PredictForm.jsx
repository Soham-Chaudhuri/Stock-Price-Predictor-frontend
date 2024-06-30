import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PredictForm = ({data}) => {
  const [open, setOpen] = useState(null);
  const [adj_close, setAdj_close] = useState(null);
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const [volume, setVolume] = useState(null);
  const validateFormData = (formData) => {
    for (const key in formData) {
      if (key !== 'idx' && isNaN(parseFloat(formData[key]))) {
        toast.error(`Input Error`, {
          theme: 'dark',
        });
        return false;
      }
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = { idx: data['idx'], open, adj_close, high, low, volume };

    if (!validateFormData(formData)) {
      return; 
    }

    try {
      const response = await axios.post("https://stock-price-predictor-2-0-backend.onrender.com/predict", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const currentLocale = window.navigator.languages[0];
      const myPriceFormatter = new Intl.NumberFormat(currentLocale, {
        style: "currency",
        currency: "EUR",
      });
      
      toast.info(`Predicted Closing Price: ${myPriceFormatter.format(response.data.prediction)}`, {
        theme: "dark",
      });
      
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`, {
        theme: "dark",
      });
    }
  };
  return (
    <>
      <div className="text-center pt-20 py-6">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Stocks Predictor
        </h1>
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Enter the following details to get a future prediction on {data['id']} stocks
        </p>
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          The above data is from 2010-2022
        </p>
       
      </div>
      <form class="lg:w-3/4 mx-auto ">
        <div class="mb-5 space-y-5">
      
          <label
            htmlFor="text"
            class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
          >
            Opening Price
          </label>
          <input
            type="text"
            id="open"
            class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            placeholder="Enter price"
            onChange={(e) => {
              setOpen(e.target.value);
            }}
            required
          />
          <label
            htmlFor="text"
            class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
          >
            Highest Price
          </label>
          <input
            type="text"
            id="high"
            class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            placeholder="Enter price"
            onChange={(e) => {
              setHigh(e.target.value);
            }}
            required
          />
          <label
            htmlFor="text"
            class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
          >
            Lowest Price
          </label>
          <input
            type="text"
            id="low"
            class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            placeholder="Enter price"
            onChange={(e) => {
              setLow(e.target.value);
            }}
            required
          />
          <label
            htmlFor="text"
            class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
          >
            Adjusted Close Price
          </label>
          <input
            type="text"
            id="adj_close"
            class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            placeholder="Enter price"
            onChange={(e) => {
              setAdj_close(e.target.value);
            }}
            required
          />
          <label
            htmlFor="text"
            class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
          >
            Volume
          </label>
          <input
            type="text"
            id="volume"
            class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            placeholder="Enter volume"
            onChange={(e) => {
              setVolume(e.target.value);
            }}
            required
          />
        </div>
        <div className="py-4 lg:w-3/6 mx-auto">
        
        <button
          type="submit"
          class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm min-w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
          onClick={submitForm}
        >
          Predict Closing Price
        </button>
        </div>
      </form>
      <ToastContainer theme="dark" />
    </>
  );
};

export default PredictForm;
