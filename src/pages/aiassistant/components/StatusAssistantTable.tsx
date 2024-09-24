

import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAssistantStatus, resetUpdateActionJson, startAssistant, updateAction } from '../../store/assistant';
import Select from 'react-select';
import RowActions from './ReccomAction';
import { MdTipsAndUpdates } from 'react-icons/md';

interface DataType {
    action: string; // ToDo: This can be null
    automation_name: string | null;
    followers: string | null;
    message: string | null;
    progress: string;
    creator_name: string;
    delivered: string | null;
    key: string;
    dm_url: string | null;
    order_id: string | null;
    product_id: string;
    product_name: string;
    status_name: string;
    time: string;
}

const StatusAssistantTable: React.FC = ({
}) => {
    const auth = useAppSelector((state) => state.auth);
    const shops = useAppSelector((state) => state.shops);
    const assistant = useAppSelector((state) => state.assistant);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(auth?.meInfo?.customer_id && shops?.selectedStoreId && !assistant.statusLoading){
        console.log("Fetching assistant status with shopID:", shops.selectedStoreId)
        dispatch(
          getAssistantStatus({
            shop_id: shops.selectedStoreId,
          })
        );
      }
    }, [auth, shops.selectedStoreId, dispatch]);

    const [changedActionsLength, setchangedActionsLength] = useState(assistant?.updateActionJson ? Object.keys(assistant.updateActionJson).length : 0);
    useEffect(() => {
      // This effect runs whenever assistant.updateActionJson changes
      setchangedActionsLength(Object.keys(assistant.updateActionJson).length);
    }, [assistant.updateActionJson]); // Dependency array includes the JSON object
    
    const handleChangeActionButtonClick = () => {
      dispatch(updateAction(
        {
          shop_id: shops.selectedStoreId,
          action_id_updates_json: assistant.updateActionJson,
        }
      ));
      console.log("Updated Actions: ", assistant.updateActionJson);
      dispatch(resetUpdateActionJson());
    };
    
    // Table Columns
    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Creator Name',
          dataIndex: 'creator_name',
          key: 'creator_name',
          fixed: 'left',
        },
        {
          title: 'Automation Name',
          dataIndex: 'automation_name',
          key: 'automation_name',
        },
        {
          title: 'Status',
          dataIndex: 'status_name',
          key: 'status_name',
          filters: [
            {
              text: 'Creator Interested',
              value: 'Creator Interested',
            },
            {
                text: 'Content Pending',
                value: 'Content Pending',
            },
            {
              text: 'Creator Requests Target Collab',
              value: 'Creator Requests Target Collab',
            },
            {
              text: 'Other',
              value: 'Other',
            }
          ],
          onFilter: (value, record) => record.status_name.startsWith(value as string),
          filterSearch: true,
          render: (_, { status_name }) => (
            <>
                <Tag color="cyan" key={status_name} style={{ borderRadius: '8px' }}>
                {status_name}
                </Tag>
            </>
          ),
        },
        {
          title: 'Last Updated',
          dataIndex: 'time',
          key: 'time',
          defaultSortOrder: 'descend',
          sorter: (a, b) => {
            // Parse the strings with timezone awareness
            const dateA = new Date(a.time); 
            const dateB = new Date(b.time);
          
            // Compare the Date objects
            return dateA.getTime() - dateB.getTime();
          },
        },
        {
            title: 'Recommended Action',
            key: 'action',
            dataIndex: 'action',
            filters: [
              {
                text: 'Send Content Guide',
                value: 'Send Content Guide',
              },
              {
                text: 'Send Reminder Message',
                value: 'Send Reminder Message',
              },
              // {
              //     text: 'Approve Sample Request',
              //     value: 'Approve Sample Request',
              // },
              // {
              //  text: 'Send Target Collab',
              //  value: 'Send Target Collab',
              // },
              {
                text: 'Other',
                value: 'Other',
              },
            ],
            filterOnClose: true,
            onFilter: (value, record) => record.action.startsWith(value as string),
            filterSearch: true,
            render: (text, record) => <RowActions initialAction={record.action} rowID={record.key}/>,
            fixed: 'right',
          },
    ];
  
    /* Row Selector & Batch Action Selection Handlers */
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedBatchActions, setSelectedBatchActions] = useState<string[]>([]);
    const [selectedBatchKeys, setSelectedBatchKeys] = useState<string[]>([]);
    const hasSelectedBatchActions = selectedBatchActions.length > 0;
    const hasSelected = selectedRowKeys.length > 0;
    const batchActionOptions = [
      { value: 'Send Content Guide', label: 'Send Content Guide' },
      { value: 'Send Reminder Message', label: 'Send Reminder Message' },
      // { value: 'Approve Sample Request', label: 'Approve Sample Request' },
      // { value: 'Send Target Collab', label: 'Send Target Collab' },
      { value: 'Other', label: 'Other' },
    ];
    const handleBatchActionChange = (selectedOptions) => {
      const actions = selectedOptions ? selectedOptions.map(option => option.value) : [];
      setSelectedBatchActions(actions);
  
      // Calculate keys for rows corresponding to the newly selected batch actions
      const batchKeys = assistant.statusData
        .filter(item => item.action && actions.includes(item.action))
        .map(item => item.key);
  
      // Update the batch selected keys
      setSelectedBatchKeys(batchKeys);
  
      // Combine batch selected keys with individually selected keys and remove duplicates
      const combinedKeys = Array.from(new Set([...selectedRowKeys.filter(key => !selectedBatchKeys.includes(key)), ...batchKeys]));
      setSelectedRowKeys(combinedKeys);
    };
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      const individualKeys = newSelectedRowKeys.filter(key => !selectedBatchKeys.includes(key));
      const combinedKeys = Array.from(new Set([...selectedBatchKeys, ...individualKeys]));
      setSelectedRowKeys(combinedKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
      ],
    };

    /* Start Button Click Handler */
    const start = () => {
      dispatch(startAssistant({
        shop_id: shops.selectedStoreId,
        action_id_list: selectedRowKeys,
      }));
      setSelectedRowKeys([]);
    };

    /* Expanded Row Render*/
    const ScrollableCell = ({ content }) => {
      return (
        <div style={{
          maxHeight: '120px', // Corresponding to about 4 lines of text if each line is roughly 18px high
          overflowY: 'auto', // Only show scrollbar when needed
          padding: '4px', // Optional for padding inside the cell
          wordWrap: 'break-word' // Ensures long words do not cause layout issues
        }}>
          {content}
        </div>
      );
    };

    const expandedRowRender = (record) => {
      const columns: TableColumnsType<DataType> = [
        { title: 'Message',
          dataIndex: 'message',
          key: 'message',
          width: '460px',
          render: text => <ScrollableCell content={text} />,
        },
        {
          title: 'Product Name',
          dataIndex: 'product_name',
          key: 'product_name',
        },
        {
          title: 'Delivered Status',
          dataIndex: 'delivered',
          key: 'delivered',
        },
        {
          title: 'Order ID',
          dataIndex: 'order_id',
          key: 'order_id',
        },
        {
          title: 'Message Portal Link',
          key: 'dm_url',
          width: '120px',
          render: (_, { dm_url }) => (
            <div className='flex justify-center'> 
              {dm_url ? 
              <a href={dm_url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                Message Portal Link
              </a>
              : <span style={{ color: 'blue', textDecoration: 'underline' }}>N/A</span>}
            </div>
          )
        }
      ];
      const expandedRowData = assistant.statusData.filter(item => item.key === record.key);
      return <Table columns={columns} dataSource={expandedRowData} pagination={false} bordered />;
    };
  
    return (
        <div className="ml-6">
          <h3 className="font-semibold text-xl mb-4"></h3>
          <label className="block text-sm font-medium text-black mb-2 flex items-center">
            <MdTipsAndUpdates className="mr-2" /> Tips and Tricks
          </label>       
          <div className="bg-white border border-ant-input-border rounded-lg col-span-1 mb-5 inline-block">
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
              Actions are taken on behalf of you by Reacher, where it can send content guides and content posting reminder messages for you in the message portal!
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
              You can message all the creators for a specific action by clicking “Select Batch Action”. You can unselect creators by clicking the checkbox.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
              Click on the + icon on left side of a creator to view more information.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
              When you are ready, click “Start Selected Actions” to kick off the process!
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: "16px" }}>
            <div style={{marginRight:12}}>
              <Select
                isMulti={true}
                placeholder="Select Batch Action"
                options={batchActionOptions}
                onChange={(selectedOptions) => {
                  handleBatchActionChange(selectedOptions);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    boxShadow: 'none',
                    border: '1px solid #E2E8F0',
                    '&:hover': {
                      borderColor: '#cbd5e1',
                    },
                  }),
                }}
                className="text-gray-700 leading-tight"
                isClearable={true}
                menuPlacement='top'
                isDisabled={!assistant.statusLoadCompleted || assistant.statusLoading}
              >
              </Select>
            </div>
            <button 
                onClick={() => start()}
                className="w-100 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                disabled={selectedRowKeys.length <= 0 || assistant.startPending}
                >
                    {assistant.startPending ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                            </svg>
                            Starting...
                        </div>
                    ) : "Start Selected Actions"}
            </button>
          </div>
            <Table
                columns={columns}
                rowSelection={rowSelection}
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                dataSource={assistant.statusData}
                style={{ marginTop: 26 }}
                pagination={{ showSizeChanger: true, pageSizeOptions: ['5','10', '20'], defaultPageSize:5}}
                footer={() => (     
                <div className='flex justify-between'> 
                  <div className='mt-1'>
                    Please note that the most recent message is only displayed when the row is expanded.
                  </div>
                  <div className='flex justify-end'>
                    <button 
                      onClick={() => handleChangeActionButtonClick()}
                      className="w-100 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                      disabled={assistant.updateActionPending || (changedActionsLength == 0)}
                    >
                      {assistant.updateActionPending ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                          </svg>
                          Updating...
                        </div>
                      ) : "Update Changed Actions"}
                    </button>
                  </div>
                </div>
                )}
                loading={!assistant.statusLoadCompleted || assistant.statusLoading}
            />
        </div>
    );
};

export default StatusAssistantTable;
