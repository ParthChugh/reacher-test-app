

import React from 'react';

interface CardProps {
  data: string | number;
  label: string;
  status?: string;
  icon: any; 
  clasName?: string; 
}

const StatsCard: React.FC<CardProps> = ({ data, label, icon, clasName }) => {
  return (
    <div className="rounded-2xl bg-white py-6 px-6 pb-2 shadow flex flex-col items-start justify-center relative">
     <div className=''>
	 <div className='flex items-center'>
		
	 <div className={`p-3 rounded-lg mr-2 ${clasName}`}>
        {icon}
      </div>
	 <span className='text-sm text-gray-500 inline-block'>
        {label}
      </span>
	 </div>

	 <div className='mt-4'>
	 <span className='text-3xl font-extrabold text-grey-300 inline-block mb-2'>
        {data}
      </span>
	 </div>

      {/* Icon */}
      
	 </div>
      {/* Status */}
      {/* {status && (
        <span className='text-xs inline-block mb-2 positive-status-color'>
          {status} Day Change
        </span>
      )} */}
    </div>
  );
};

export default StatsCard;
