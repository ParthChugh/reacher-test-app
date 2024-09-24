

import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-1/3 bg-gray-300 rounded-3xl h-10 mb-9"></div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <div className="bg-gray-300 h-36 rounded-2xl"></div>
        <div className="bg-gray-300 h-36 rounded-2xl"></div>
        <div className="bg-gray-300 h-36 rounded-2xl"></div>
        <div className="bg-gray-300 h-36 rounded-2xl"></div>
      </div>
      <div className="mt-44 grid-cols-12 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
        <div className="col-span-6 rounded-md border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-6 xl:col-span-6">
          <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-80 bg-gray-200 rounded w-full mt-5"></div>
          </div>
        </div>
        <div className="col-span-6 rounded-md border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-6 xl:col-span-6">
          <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-80 bg-gray-200 rounded w-full mt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
