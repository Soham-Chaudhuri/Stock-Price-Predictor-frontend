import React, { useEffect, useRef } from "react";
import {
  createChart,
  CrosshairMode,
  LineStyle,
  PriceScaleMode,
} from "lightweight-charts";

const ApexChart = ({ data }) => {
  const chartContainerRef = useRef();
  const chartContainer2Ref = useRef();
  // console.log(typeof(data[0]['time']));
  useEffect(() => {
    // console.log(data);
    let array1 = data.map((item) => ({
      time: item.time,
      open: item.open,
      close: item.close,
      high: item.high,
      low: item.low,
    }));

    let array2 = data.map((item) => ({
      time: item.time,
      value: item.volume / 1000000,
    }));

    let array3 = data.map((item) => ({
      time: item.time,
      value: item.adj_close,
    }));
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          color: "#27272A",
        },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#38BDF8" },
        horzLines: { color: "#38BDF8" },
      },
      width: chartContainerRef.current.clientWidth,
      height: window.innerWidth > 550 ? 500 : window.innerHeight * 0.3,
    });
    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    const currentLocale = window.navigator.languages[0];
    const myPriceFormatter = Intl.NumberFormat(currentLocale, {
      style: "currency",
      currency: "EUR",
    }).format;
    chart.applyOptions({
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 8,
          color: "#C3BCDB44",
          style: LineStyle.Solid,
          labelBackgroundColor: "#9B7DFF",
        },
        horzLine: {
          color: "#9B7DFF",
          labelBackgroundColor: "#9B7DFF",
        },
      },
      localization: {
        priceFormatter: myPriceFormatter,
      },
    });
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: window.innerWidth > 550 ? 500 : window.innerHeight * 0.3,
      });
    };
    const priceScale = chart.priceScale("right");
    // const width = priceScale.width();
    // console.log(priceScale);
    priceScale.applyOptions({
      autoScale: false,
      scaleMargins: {
        top: 0.1,
        bottom: 0.2,
      },
    });
    window.addEventListener("resize", handleResize);
    newSeries.setData(array1);

    ////////////////////////////////////////////////////////////////////////////

    const chart2 = createChart(chartContainer2Ref.current, {
      layout: {
        background: {
          color: "#27272A",
        },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#38BDF8" },
        horzLines: { color: "#38BDF8" },
      },
      width: chartContainerRef.current.clientWidth,
      height: window.innerWidth > 550 ? 500 : window.innerHeight * 0.3,
    });
    const areaSeries1 = chart2.addAreaSeries({
      lastValueVisible: false,
      crosshairMarkerVisible: false,
      lineColor: "transparent",
      // lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });
    areaSeries1.setData(array2);
    // const areaSeries1 = chart.addAreaSeries({
    //   lineColor: "#2962FF",
    //   topColor: "#2962FF",
    //   bottomColor: "rgba(41, 98, 255, 0.28)",
    // });
    // areaSeries1.setData(array3);
    chart2.applyOptions({
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 8,
          color: "#C3BCDB44",
          style: LineStyle.Solid,
          labelBackgroundColor: "#9B7DFF",
        },
        horzLine: {
          color: "#9B7DFF",
          labelBackgroundColor: "#9B7DFF",
        },
      },
    });
    const handleResize2 = () => {
      chart.applyOptions({
        width: chartContainer2Ref.current.clientWidth,
        height: window.innerWidth > 550 ? 500 : window.innerHeight * 0.3,
      });
    };
    const priceScale2 = chart2.priceScale("right");
    // const width = priceScale.width();
    // console.log(priceScale);
    priceScale2.applyOptions({
      autoScale: false,
      scaleMargins: {
        top: 0.1,
        bottom: 0.2,
      },
    });

    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize2);

    return () => {
      chart.remove();
      chart2.remove();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize2);
    };
  }, []);

  return (
    <>
      <div className="space-y-20">
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-3xl sm:px-16 xl:px-48 dark:text-gray-400">
          K-Line -
        </p>
        <div
          ref={chartContainerRef}
          className="rounded-[3rem] overflow-hidden w-4/5 mx-auto"
        ></div>
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-3xl sm:px-16 xl:px-48 dark:text-gray-400">
          Volume in 10<sup>6</sup> -
        </p>
        <div
          ref={chartContainer2Ref}
          className="rounded-[3rem] overflow-hidden w-4/5 mx-auto"
        ></div>
      </div>
    </>
  );
};

export default ApexChart;
