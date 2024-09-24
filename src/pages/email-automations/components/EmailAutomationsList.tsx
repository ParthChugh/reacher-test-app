

import React, { useState, useEffect, useRef } from "react";
import {
  startAutomation,
  stopAutomation,
  deleteAutomation,
} from "../../store/automation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import { handleError, handleWarning } from "../../helpers";
import { Button, Input, InputRef, Space, Table, TableColumnType, TableProps, Tag } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { deleteEmailAutomation, getEmailAutomations, startEmailAutomation, stopEmailAutomation } from "../../store/emailAutomations";
import EmailAutomationListActions from "./EmailAutomationsListActions";

interface EmailAutomationListProps {
  automations: any;
  isAutomationsLoading: boolean;
  onRowClick?: (dataItem: any) => void; // Function to handle row click
}

interface DataType {
  key: string;
  mail_auto_id: number; // Unique identifier for the automation, this will be used as the action column & key for the table
  mail_auto_name: string;
  shop_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  state: string;
  body: string;
  subject: string;
  num_creators_emailed: number;
  num_remaining: number;
  image_url: string;
  image_name: string;
  filters: {};
  num_creators_filtered: number;
}

type DataIndex = keyof DataType;

const EmailAutomationList: React.FC<EmailAutomationListProps> = ({
  automations,
  isAutomationsLoading,
  onRowClick,
}) => {
  const auth = useAppSelector((state) => state.automation);
  const shops = useAppSelector((state) => state.shops);
  const dispatch = useAppDispatch();

  const [tableData, setTableData] = useState<DataType[]>([]);
  const [tableDataLoading, setTableDataLoading] = useState(true);

  useEffect(() => {
    setTableDataLoading(true);
    // Transform the data for our table format
    console.log(automations);
    if (!automations) return; // If there are no automations, return early
    const transformedData = automations.map(item => ({
      ...item,
      key: item.mail_auto_id.toString(),
      created_at: item.created_at.split('T')[0],
      updated_at: item.updated_at ? item.updated_at.split('T')[0] : "",
    }));
    console.log("Transformed Data: ",transformedData);
    
    // Sort the data by created_at before setting it
    const sortedData = transformedData.sort((a, b) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
    
    setTableData(sortedData);
    setTableDataLoading(false);
  }, [automations]);

  // State to track starting
  const [isRunning, setIsRunning] = useState(false);

  const handleStartAutomation = async (
    automationId: number,
    shop_id: number
  ) => {
    const result = await dispatch(
      startEmailAutomation({
        mail_auto_id: automationId,
        shop_id: shop_id,
      })
    );

    if (startAutomation.rejected.match(result)) {
      // @ts-ignore
      if (result.payload || !result.payload) {
        handleWarning(result.payload);
      }
      return;
    }
    dispatch(
        getEmailAutomations({
          shop_id: shops.selectedStoreId,
        })
    );
  };

  const handleStart = async (automationId: number, selectedStoreId: number) => {
    setIsRunning(true);
    await handleStartAutomation(automationId, selectedStoreId);
    setIsRunning(false);
  };

  // State to track stopping TODO: Implement this & backend apis
  const [isStopping, setIsStopping] = useState(false);

  const handleStopAutomation = async (
    automationId: number,
    shop_id: number
  ) => {
    const result = await dispatch(
      stopEmailAutomation({
        mail_auto_id: automationId,
        shop_id: shop_id,
      })
    );

    if (stopAutomation.rejected.match(result)) {
      // @ts-ignore
      if (result.payload || !result.payload) {
        handleWarning(result.payload);
      }
      return;
    }

    toast.success("Automation Stopped!");
    dispatch(
        getEmailAutomations({
          shop_id: shops.selectedStoreId,
        })
    );
  };

  const handleStop = async (automationId: number, selectedStoreId: number) => {
    setIsStopping(true);
    await handleStopAutomation(automationId, selectedStoreId);
    setIsStopping(false);
  };

  // State to track deletion
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAutomation = async (
    automationId: number,
    shop_id: number
  ) => {
    const result = await dispatch(
        deleteEmailAutomation({
        mail_auto_id: automationId,
        shop_id: shop_id,
      })
    );

    if (deleteAutomation.rejected.match(result)) {
      // @ts-ignore
      if (result.payload || !result.payload) {
        handleError(result.payload);
      }
      return;
    }

    toast.success("Automation Deleted!");
    dispatch(
        getEmailAutomations({
          shop_id: shops.selectedStoreId,
        })
    );
  };

  const handleDelete = async (automationId: number, selectedStoreId: number) => {
    setIsDeleting(true);
    await handleDeleteAutomation(automationId, selectedStoreId);
    setIsDeleting(false);
  };

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
  // ToDo: Add Action Column
  const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'mail_auto_name',
          key: 'mail_auto_name',
          fixed: 'left',
          ...getColumnSearchProps('mail_auto_name'),
        },
        {
          title: 'Date Created',
          dataIndex: 'created_at',
          key: 'created_at',
          defaultSortOrder: 'descend',
          sorter: (a, b) => {
            // Parse the strings with timezone awareness
            const dateA = new Date(a.created_at); 
            const dateB = new Date(b.created_at);
          
            // Compare the Date objects
            return dateA.getTime() - dateB.getTime();
          },
        },
        {
            title: 'Creators Filtered',
            dataIndex: 'num_creators_filtered',
            key: 'num_creators_filtered',
            sorter: (a, b) => a.num_creators_filtered - b.num_creators_filtered,
        },
        {
          title: 'Creators Emailed',
          dataIndex: 'num_creators_emailed',
          key: 'num_creators_emailed',
          sorter: (a, b) => a.num_creators_emailed - b.num_creators_emailed,
        },
        {
            title: 'Creators Remaining',
            key: 'num_remaining',
            dataIndex: 'num_remaining',
            sorter: (a, b) => a.num_remaining - b.num_remaining,
        },
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: 'mail_auto_id',
            fixed: 'right',
            width: "240px",
            render: (text, record) => (
              <EmailAutomationListActions
                record={record}
                isRunning={isRunning}
                isStopping={isStopping}
                isDeleting={isDeleting}
                handleStart={handleStart}
                handleStop={handleStop}
                handleDelete={handleDelete}
                onRowClick={onRowClick}
                shops={shops}
              />
            ),
        }
    ];

  return (
    <div className="ml-6 mt-10">
      <h3 className="font-semibold text-xl mb-4">Active Email Automations:</h3>
      <div className="flex justify-center items-center mt-10">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={tableDataLoading}
          pagination={{ showSizeChanger: true, pageSizeOptions: ['5','10', '20'], defaultPageSize:5}}
          scroll={{ x: 1100 }}
          sortDirections={['descend']}
        />
      </div>
    </div>
  );
};

export default EmailAutomationList;