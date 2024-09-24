

import React from 'react';
import withAuth from '../components/withAuth';
import withShop from '../components/withShop';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import clientService from '../helpers/client';
import { Api } from '../constants/api';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getShopsList } from '../store/shops';

const PaymentSuccess = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams(); // Use useSearchParams to get query parameters
  const session_id = searchParams.get('session_id');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    const fetchSession = async () => {
        console.log("Fetching session details for session_id", session_id);
        try {
        const response = await clientService.get(Api.stripePayment.getSession(session_id));
        setSession(response.data);
        setLoading(false);
        console.log("Fetched session details", response.data);
        } catch (error) {
        console.error('Error fetching session details', error);
        }
    };

    useEffect(() => {
        console.log("Entered to payment success page, checking session_id", session_id);
        if (session_id && auth.meInfo.customer_id) {
            fetchSession();
            dispatch(getShopsList({ customer_id: auth.meInfo.customer_id }));
        }
    }, [session_id, auth.meInfo.customer_id]);

    return (
        <div>
            {loading ? (
                <div></div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stroke border-gray-300">
                            <h1 className="text-2xl text-blue-500 font-bold">Checkout Session Completed!</h1>
                        </div>
                    
                        <div className="max-w-2xl mx-auto my-10 p-4 bg-white rounded-lg shadow-lg">
                            <div className="pb-6 mb-6 border-b border-gray-300 text-center">
                                <h2 className="text-2xl text-black font-bold ">Payment Successful!</h2>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl text-black font-semibold mb-4">Thank you for your subscription.</h2>
                                <p className="text-lg text-gray-700 mb-2">You can always manage your subscriptions from your account.</p>
                                <div className="bg-gray-100 p-4 rounded-lg mt-4 text-left">
                                    <h3 className="text-lg text-blue-500 font-semibold mb-1">Transaction Details</h3>
                                    <p><span className="font-semibold text-black">Status:</span> {session.status.charAt(0).toUpperCase() + session.status.slice(1)}</p>
                                    <p><span className="font-semibold text-black">Amount Total:</span> ${session.amount_total / 100}</p>
                                    <p><span className="font-semibold text-black">Payment Method:</span> {session.payment_method_types[0].charAt(0).toUpperCase() + session.payment_method_types[0].slice(1)}</p>
                                    <p><span className="font-semibold text-black">Currency:</span> {session.currency.toUpperCase()}</p>
                                    <h3 className="text-lg text-blue-500 font-semibold mb-1 mt-2">Customer Details</h3>
                                    <p><span className="font-semibold text-black">Name:</span> {session.customer_details.name}</p>
                                    <p><span className="font-semibold text-black">Email:</span> {session.customer_details.email}</p>
                                    {session.customer_details.address && (
                                        <div className="mt-4">
                                            <h4 className="text-md text-black font-semibold">Address:</h4>
                                            <p><span className="font-semibold text-black">Line 1:</span> {session.customer_details.address.line1}</p>
                                            {session.customer_details.address.line2 && <p><span className="font-semibold text-black">Line 2:</span> {session.customer_details.address.line2}</p>}
                                            <p><span className="font-semibold text-black">City:</span> {session.customer_details.address.city}</p>
                                            <p><span className="font-semibold text-black">State:</span> {session.customer_details.address.state}</p>
                                            <p><span className="font-semibold text-black">Postal Code:</span> {session.customer_details.address.postal_code}</p>
                                            <p><span className="font-semibold text-black">Country:</span> {session.customer_details.address.country}</p>
                                        </div>
                                    )}
                                    {session.customer_details.phone && (
                                        <p><span className="font-semibold text-black">Phone:</span> {session.customer_details.phone}</p>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700 mb-2 mt-2">If you have any questions or concerns, feel free to contact us at <span className='text-blue-700'>team@reacherapp.com</span>!</p>
                            </div>
                        </div>
                    </div>
                )}
        </div>


    );
};

export default withAuth(withShop(PaymentSuccess));
