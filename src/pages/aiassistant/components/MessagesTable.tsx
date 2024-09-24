

import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import type { InputRef, TableColumnType, TableProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAssistantMessages } from '../../store/assistant';
import Select from 'react-select';

interface DataType {
    key: string;
    action: string;
    automation_name: string;
    content: string | null;
    creator_name: string;
    dm_url: string | null;
    status: string;
    time: string;
}

type DataIndex = keyof DataType;

const MessagesTable: React.FC = ({
}) => {
    // Table Data
    const [messageData, setMessageData] = useState<DataType[]>([]);
    const [tableDataLoading, setTableDataLoading] = useState(true);

    // Batch Actions
    const [selectedBatchActions, setSelectedBatchActions] = useState<string[]>([]);
    const hasSelectedBatchActions = selectedBatchActions.length > 0; 

    const auth = useAppSelector((state) => state.auth);
    const shops = useAppSelector((state) => state.shops);
    const assistant = useAppSelector((state) => state.assistant);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(auth?.meInfo?.customer_id && shops?.selectedStoreId && !assistant.messagesLoading && !assistant.messagesLoadCompleted){
        setTableDataLoading(true);
        dispatch(
          getAssistantMessages({
            shop_id: shops.selectedStoreId,
          })
        );
      }
      else if(assistant.messagesLoadCompleted){
        setMessageData(assistant.messagesData);
        setTableDataLoading(false);
        console.log('Messages Data:', assistant.messagesData);
      }
    }, [auth, shops.selectedStoreId, assistant.messagesLoadCompleted ,dispatch]);

    /* Row Selector */
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const start = () => {
      // ajax request after empty completing, Call your api
      setTimeout(() => {
        setSelectedRowKeys([]);
        setSelectedBatchActions([]);
      }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
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
    const hasSelected = selectedRowKeys.length > 0;

    // Column Search
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
  
    const handleSearch = (
      selectedKeys: string[],
      confirm: FilterDropdownProps['confirm'],
      dataIndex: DataIndex,
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
    };
  
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              Close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    // Columns
    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Creator Name',
          dataIndex: 'creator_name',
          key: 'creator_name',
          fixed: 'left',
          ...getColumnSearchProps('creator_name'),
        },
        {
            title: 'Automation Name',
            dataIndex: 'automation_name',
            key: 'automation_name',
            ...getColumnSearchProps('automation_name'),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
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
          onFilter: (value, record) => record.status.startsWith(value as string),
          filterSearch: true,
          render: (_, { status }) => (
            <>
                <Tag color="cyan" key={status} style={{ borderRadius: '8px' }}>
                {status}
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
                text: 'Send Reminder Message',
                value: 'Send Reminder Message',
              },
              {
                  text: 'Approve Sample Request',
                  value: 'Approve Sample Request',
              },
              {
                text: 'No Action',
                value: '',
              },
            ],
            filterOnClose: true,
            onFilter: (value, record) => record.action.startsWith(value as string),
            filterSearch: true,
            render: (_, { action }) => (
              <>
                {
                  (() => {
                    let color = 'geekblue';
                    if (action === 'Send Reminder Message') {
                      color = 'volcano';
                    } else if (action === "") {
                      color = 'lime';
                    } else if (action === 'Approve Sample Request') {
                      color = 'purple';
                    } else if (action === 'Other') {
                      color = 'magenta';
                    }
                    return (
                      <Tag color={color} key={action} style={{ borderRadius: '8px' }}>
                        {action === "" ? "-" : action.toUpperCase()}
                      </Tag>
                    );
                  })()
                }
              </>
            ),
            fixed: 'right',
          },
    ];    

    return (
        <div className="ml-6">
            <h3 className="font-semibold text-xl mb-4"></h3>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{marginRight:12}}>
                <Select
                  isMulti={true}
                  placeholder="Select Batch Action"
                  options={[
                    { value: 'Send Reminder Message', label: 'Send Reminder Message' },
                    { value: 'Approve Sample Request', label: 'Approve Sample Request' },
                    { value: 'No Action', label: 'No Action' },
                  ]}
                  onChange={(selectedOptions) => {
                    console.log(selectedOptions);
                    setSelectedBatchActions(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
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
                >
                </Select>
              </div>
              <button
                    disabled={!hasSelected}
                    className={`w-100 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
                    onClick={() => start()}
                  >
                    Start Selected Actions
              </button>
            </div>
            <div style={{ marginBottom: 2,  display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ marginTop: 8, marginRight:8, color: 'red'}} >
                {hasSelected ? `Selected ${selectedRowKeys.length} individual actions` : ''}
              </span>
            </div>
            <div style={{ marginBottom: 16,  display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ marginRight:8, color: 'red'}} >
                {hasSelectedBatchActions ? `Selected ${selectedBatchActions.length} batch actions` : ''}
              </span>
            </div>
            <Table
                columns={columns}
                rowSelection={rowSelection}
                expandable={{
                    expandedRowRender: (record) => (
                      <div>
                        <p style={{ margin: 0 }}>
                          {record.content === null ? "Creator Message" : record.content}
                        </p>
                        {record.dm_url && ( // Checks if dm_url exists and is not empty
                          <p style={{ margin: 0 }}>
                            Click{' '}
                            <a href={record.dm_url} target="_blank" rel="noopener noreferrer">
                              here
                            </a>
                            {' '}to access the message portal.
                          </p>
                        )}
                      </div>
                    ),
                    rowExpandable: (record) => record.content !== ' ' || record.content !== null,
                }}
                dataSource={messageData}
                style={{ marginTop: 26 }}
                pagination={{ showSizeChanger: true, pageSizeOptions: ['5','10', '20'], defaultPageSize:5}}
                footer={() => (      
                  <div>
                    Please note that the most recent message is only displayed when the row is expanded.<br />
                    You can find links to the message portals together with the most recent message.
                  </div>
                )}
                summary={() => (
                    <Table.Summary fixed={'bottom'}>
                    </Table.Summary>
                  )}
                  sticky={{ offsetHeader: 0 }}
                  loading={tableDataLoading}
          />
        </div>
    );
};

export default MessagesTable;
