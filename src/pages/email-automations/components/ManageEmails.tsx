import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import clientService from '../../helpers/client';
import { message, Popconfirm, Table } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RiDeleteBin2Line } from 'react-icons/ri';
// import { signIn } from 'next-auth/react';

dayjs.extend(relativeTime);

interface ManageEmailsProps {
  onReturn: () => void;
  onRefresh: () => void;
}

interface EmailAccount {
  email_account_id: number;
  account: string;
  created_at: string;
}

const ManageEmails: React.FC<ManageEmailsProps> = ({ onReturn, onRefresh }) => {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const shops = useAppSelector((state) => state.shops);

  useEffect(() => {
    const fetchEmailAccounts = async () => {
      try {
        const response = await clientService.post('/api/manage_emails/list', {
          shop_id: shops.selectedStoreId,
        });
        setEmailAccounts(response.data);
      } catch (error) {
        console.error('Error fetching email accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (shops.selectedStoreId) {
      fetchEmailAccounts();
    }
  }, [shops.selectedStoreId]);

  const handleDelete = async (email_account_id: number) => {
    try {
      await clientService.post('/api/manage_emails/delete', {
        shop_id: shops.selectedStoreId,
        email_account_id,
      });
      message.success('Email account deleted successfully');
      setEmailAccounts(emailAccounts.filter(account => account.email_account_id !== email_account_id));
    } catch (error) {
      console.error('Error deleting email account:', error);
      message.error('Failed to delete email account');
    }
  };

  const columns = [
    {
      title: 'No.',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => {
        const date = dayjs(text);
        if (dayjs().diff(date, 'day') < 7) {
          return date.fromNow(); // e.g., "2 days ago"
        } else {
          return date.format('MMM D, YYYY'); // e.g., "Sep 11, 2023"
        }
      },
      sorter: (a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix(),
      defaultSortOrder: 'descend' as const,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this email account?"
          onConfirm={() => handleDelete(record.email_account_id)}
          okText="Yes"
          cancelText="No"
        >
          <button className="bg-red-400 hover:bg-red-600 text-white font-bold p-2 rounded-md transition duration-300 ease-in-out">
            <RiDeleteBin2Line className="text-white" size={24} />
          </button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Manage Emails</h2>
      <button
        onClick={() => {
          // Store the shop ID in localStorage
          localStorage.setItem('tempShopId', shops.selectedStoreId.toString());
          // signIn('google', { 
          //   callbackUrl: `/email-automations?addEmail=true`
          // }).then(() => {
          //   console.log('Sign-in process completed');
          // }).catch((error) => {
          //   console.error('Error during sign-in:', error);
          // });
        }}
        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
      >
        Add Email
      </button>
      <Table
        columns={columns}
        dataSource={emailAccounts}
        loading={loading}
        rowKey="email_account_id"
      />
      <button
        onClick={() => {
          onRefresh();
          onReturn();
        }}
        className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default ManageEmails;