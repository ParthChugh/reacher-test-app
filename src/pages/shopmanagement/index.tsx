

import React from 'react';
import withAuth from '../components/withAuth';
import withShop from '../components/withShop';
import ShopModal from '../components/ShopModal';
import ShopList from './components/ShopList';

const ShopManagement = () => {
    return (
        <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stroke border-gray-300">
                <h1 className="text-2xl text-blue-500 font-bold">Shops Manager</h1>
                <ShopModal isInitialShop={false}/>
            </div>
            <ShopList/>
        </div>
    );
};

export default withAuth(withShop(ShopManagement));