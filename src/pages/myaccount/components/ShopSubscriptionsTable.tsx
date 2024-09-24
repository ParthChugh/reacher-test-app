

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRenevalDates } from '../../store/subscriptions';

interface DataType {
    key: string;
    shop_id: number;
    customer_id: number;
    shop_name: string;
    shop_region: string;
    status: string;
    stripe_subscription_id: string;
    reneval_date: string;
}

const ShopSubscriptions: React.FC = ({
}) => {
    // Table Data
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [tableDataLoading, setTableDataLoading] = useState(true);
    const auth = useAppSelector((state) => state.auth);
    const shops = useAppSelector((state) => state.shops);
    const subscriptions = useAppSelector((state) => state.subscriptions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(auth?.meInfo?.customer_id && !subscriptions.loadCompleted && shops.shops.length > 0){
          setTableDataLoading(true);
          dispatch(
            getRenevalDates({
              subscription_ids: shops.shops.map((shop) => 
                shop.status === 'payment_pending' ? 'payment_pending' : shop.stripe_subscription_id
              ),
            })
          );
        }
        else if(subscriptions.loadCompleted && shops.shops.length > 0){
            console.log('subscriptions.renewal_dates', subscriptions.renewal_dates);
            setTableData(shops.shops.map((shop, index) => {
                // Get the renewal date of the shop
                let renewalDateValue = subscriptions.renewal_dates[index];
                // Check if the value is not 'payment_pending'
                if (renewalDateValue !== 'Payment Pending') {
                    const unixTimestamp = parseInt(renewalDateValue, 10); // Convert the value to a number
                    const renewalDate = new Date(unixTimestamp * 1000); // Convert to a Date object
                    renewalDateValue = renewalDate.toLocaleDateString("en-US"); // Convert to a readable format
                }

                return {
                    key: shop.shop_id.toString(),
                    shop_id: shop.shop_id,
                    customer_id: shop.customer_id,
                    shop_name: shop.shop_name,
                    shop_region: shop.shop_region,
                    status: shop.status.toUpperCase() === "PAYMENT_PENDING" 
                    ? shop.status.toUpperCase().split("_").join(" ") 
                    : shop.status.toUpperCase(),
                    stripe_subscription_id: shop.stripe_subscription_id,
                    reneval_date: renewalDateValue // Converts the date to a readable format, e.g., "12/31/1969" or uses Payment Pending
                };
            }));
            console.log('tableData', tableData);
            setTableDataLoading(false);
        }
    }, [auth, subscriptions.loadCompleted, dispatch]);

    // Columns
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Shop Name',
            dataIndex: 'shop_name',
            key: 'shop_name',
            fixed: 'left',
        },
        {
            title: 'Shop Region',
            dataIndex: 'shop_region',
            key: 'shop_region',
        },
        {
            title: 'Subscription Renewal Date',
            dataIndex: 'reneval_date',
            key: 'reneval_date',
        },
        {
            title: 'Shop Tier',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={tableData}
                style={{ marginTop: 26 }}
                pagination={{ showSizeChanger: true, pageSizeOptions: ['5','10', '20'], defaultPageSize:5}}
                footer={() => (      
                  <div>
                    <p className="text-sm mb-2 mt-2">If you have any questions or concerns, feel free to contact us at <span className='text-blue-700'>team@reacherapp.com</span>!</p>
                  </div>
                )}
                summary={() => (
                    <Table.Summary fixed={'bottom'}>
                    </Table.Summary>
                  )}
                  sticky={{ offsetHeader: 0 }}
                  loading={tableDataLoading}
          />
        </>
    );
};

export default ShopSubscriptions;