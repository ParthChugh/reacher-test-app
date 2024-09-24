

import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { InputRef, TableColumnType, TableProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getMessagedCreators } from '../store/statistics';
import * as XLSX from 'xlsx';

interface DataType {
    key: string;
    automation_name: string;
    content: string | null;
    creator_name: string;
    date: string;
    replied_status: string;
}

interface MessagedCreator {
  automation_name: string;
  content: string | null;
  creator_name: string;
  date: string;
  replied_status: string;
}

type DataIndex = keyof DataType;

const MessagedCreators: React.FC = ({
}) => {
    // Table Data
    const [messageData, setMessageData] = useState<DataType[]>([]);
    const [rawMessageData, setRawMessageData] = useState<MessagedCreator[]>([]);
    const [tableDataLoading, setTableDataLoading] = useState(true);
    const downloading = false;

    const auth = useAppSelector((state) => state.auth);
    const shops = useAppSelector((state) => state.shops);
    const statistics = useAppSelector((state) => state.statistics);
    const dispatch = useAppDispatch();

    const [filteredData, setFilteredData] = useState([]);

    const handleTableChange = (pagination, filters, sorter, extra) => {
      const filteredDataWithoutKey = extra.currentDataSource.map(({ key, ...rest }) => rest);
      setFilteredData(filteredDataWithoutKey);
    };

    useEffect(() => {
      if(auth?.meInfo?.customer_id && shops?.selectedStoreId && !statistics.messagedCreatorsLoading && !statistics.messagedCreatorsLoadCompleted){
        setTableDataLoading(true);
        dispatch(
          getMessagedCreators({
            shop_id: shops.selectedStoreId,
          })
        );
      }
      else if(statistics.messagedCreatorsLoadCompleted){
        // ToDo set message data from statistics, give every instence a key setMessageData(assistant.assistantHistory);
        console.log('Messaged Creators:', statistics.messagedCreators);
        setRawMessageData(statistics.messagedCreators);
        setFilteredData(statistics.messagedCreators); // Initially filtered data will be the actual data itself
        console.log('Raw Messaged Creators set, now setting message data');
        const dataWithKeys = statistics.messagedCreators.map((item, index) => ({
          key: index.toString(), // Converting index to string if needed, otherwise just use index
          ...item
        }));
        setMessageData(dataWithKeys);
        console.log('Message Data set', dataWithKeys);
        setTableDataLoading(false);
      }
    }, [auth, shops.selectedStoreId, statistics.messagedCreatorsLoadCompleted ,dispatch]);

    function handleDownload(data) {
      // Create a new workbook object
      const workbook = XLSX.utils.book_new();
    
      // Convert data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
    
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
      // Generate an XLSX file
      const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }
    
      // Create a Blob from the XLSX file
      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    
      // Generate a URL for the Blob
      const url = URL.createObjectURL(blob);
    
      // Create an <a> element with the URL as the download link
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'MessagedCreators.xlsx'; // Name of the file to download
    
      // Append the link to the document, trigger the download, and remove the link
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

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
          title: 'Replied Status',
          dataIndex: 'replied_status',
          key: 'replied_status',
          filters: [
            { text: 'Replied', value: 'Replied' },
            { text: 'Not Replied', value: 'Not Replied' },
          ],
          onFilter: (value, record) => record.replied_status.startsWith(value as string),
          filterSearch: true,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          defaultSortOrder: 'descend',
          sorter: (a, b) => {
            // Parse the strings with timezone awareness
            const dateA = new Date(a.date); 
            const dateB = new Date(b.date);
          
            // Compare the Date objects
            return dateA.getTime() - dateB.getTime();
          },
        },
    ];    

    return (
        <div className="ml-6">
            <h3 className="font-semibold text-xl mb-4"></h3>
            <div style={{ marginBottom: 2,  display: 'flex', justifyContent: 'flex-end' }}>
            </div>
            <Table
                onChange={handleTableChange}
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                      <div>
                        <p style={{ margin: 0 }}>
                          {record.content === null ? "Creator Message" : record.content}
                        </p>
                      </div>
                    ),
                    rowExpandable: (record) => record.content !== ' ' || record.content !== null,
                }}
                dataSource={messageData}
                style={{ marginTop: 26 }}
                pagination={{ showSizeChanger: true, pageSizeOptions: ['5','10', '20'], defaultPageSize:5}}
                footer={() => (     
                  <div className='flex justify-between'> 
                    <div className='mt-1'>
                      Please note that the most recent message is only displayed when the row is expanded.
                    </div>
                    <div className='flex justify-end'>
                      <button 
                        onClick={() => handleDownload(filteredData)}
                        className="w-100 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        disabled={downloading || (rawMessageData.length == 0)}
                      >
                        {downloading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                            </svg>
                            Downloading...
                          </div>
                        ) : "Download Message History"}
                      </button>
                    </div>
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

export default MessagedCreators;
