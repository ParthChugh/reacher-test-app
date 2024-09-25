

import { Suspense, lazy } from 'react';

// Dynamically import ReactApexChart only on the client-side


const ReactApexChart = lazy(() => import('react-apexcharts'));



const CreatorsMessagePerDayChart = ({ categories, seriesData, title, label }) => {

  const chartData = {
    series: [
      {
        name: label, // Assuming this name is generic enough, can be changed via props if needed
        data: seriesData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories,
      },
    },
  };

  return (
    <div className="col-span-6 rounded-md border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-6 xl:col-span-6">
      <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <p className="font-semibold text-primary text-md">
          {title}
        </p>
        <div className="w-full">
          <div id="YearlyAnalyticsChart" className="-ml-5 w-full">
            <Suspense
              fallback={
                <div className="h-80 flex justify-center items-center">
                
                </div>
              }
            >
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={330}
                width={"100%"}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorsMessagePerDayChart;
