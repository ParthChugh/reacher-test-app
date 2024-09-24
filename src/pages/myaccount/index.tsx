

import React from 'react';
import withAuth from '../components/withAuth';
import withShop from '../components/withShop';
import CustomerPortal from './components/CustomerPortal';
import ShopSubscriptions from './components/ShopSubscriptionsTable';
import { useAppSelector } from '../hooks';

const MyAccount = () => {
    const auth = useAppSelector((state) => state.auth);
    return (
        <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stroke border-gray-300">
                <h1 className="text-2xl text-blue-500 font-bold">My Account</h1>
            </div>
            <div className='mx-auto my-auto p-4 bg-gray-50 rounded-lg shadow-sm'>
                <h1 className="text-lg text-blue-500 font-semibold mb-1">Account Details</h1>
                {
                    auth.meInfo.customer_id &&
                    <p><span className="font-bold text-blue-500">Customer ID:</span> <span className='font-semibold'> {auth.meInfo.customer_id} </span></p>
                }
                <p><span className="font-bold text-blue-500">Name:</span> <span className='font-semibold'> {auth.meInfo.name} </span></p>
                <p><span className="font-bold text-blue-500">Email:</span> <span className='font-semibold'> {auth.meInfo.email} </span></p>
                <p>
                    {auth.meInfo.tier && 
                    (<><span className="font-bold text-blue-500">Tier:</span> <span className='font-semibold'> {auth.meInfo.tier.charAt(0).toUpperCase() + auth.meInfo.tier.slice(1)} </span> </>)
                    }
                </p>
            </div>
            
            <ShopSubscriptions />
            <CustomerPortal />
        </div>
    );
};

export default withAuth(withShop(MyAccount));