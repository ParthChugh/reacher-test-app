

import React, { useState, useEffect, useRef } from "react";
import {
  startAutomation,
  stopAutomation,
  deleteAutomation,
  getAutomations,
} from "../../store/automation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import { handleError, handleWarning } from "../../helpers";
import { Button, Input, InputRef, Space, Table, TableColumnType, TableProps, Tag } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import AutomationListActions from "./AutomationListActions";

interface AutomationListProps {
  automations: any;
  isAutomationsLoading: boolean;
  onRowClick?: (dataItem: any) => void; // Function to handle row click
}

interface DataType {
  key: string;
  automation_name: string;
  automation_type: string;
  created_at: string;
  sent_messages: string;
  remaining_creators: string;
  status: string;
  automation_id: number; // Unique identifier for the automation, this will be used as the action column & key for the table
}

type DataIndex = keyof DataType;

const AutomationList: React.FC<AutomationListProps> = ({
  automations,
  onRowClick,
}) => {
  const shops = useAppSelector((state) => state.shops);
  const dispatch = useAppDispatch();

  const [tableData, setTableData] = useState<DataType[]>([]);
  const [tableDataLoading, setTableDataLoading] = useState(true);

  useEffect(() => {
    setTableDataLoading(true);

    // Transform the data for our table format
    console.log(automations);
    if (!automations) return; 
    /*
    const transformedData = automations.map(item => ({
      key: item.automation_id.toString(),
      automation_name: item.automation_name,
      automation_type: item.automation_type,
      created_at: item.created_at.split('T')[0],
      sent_messages: item.sent_messages.toString(),
      remaining_creators: item.remaining_creators,
      status: item.status,
      automation_id: item.automation_id
    }));
    */
    const transformedData = automations.map(item => ({
      ...item,
      key: item.automation_id.toString(),
      created_at: item.created_at.split('T')[0],
    }));
    console.log("Transformed Data: ",transformedData);
    setTableData(transformedData);
    setTableDataLoading(false);
  }, [automations]);

  // State to track starting
  const [isRunning, setIsRunning] = useState(false);

  const handleStartAutomation = async (
    automationId: number,
    shop_id: number
  ) => {
    const result = await dispatch(
      startAutomation({
        automation_id: automationId,
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

    toast.success("Automation Started!");
    dispatch(
      getAutomations({
        shop_id: shop_id,
      })
    );
  };

  const handleStart = async (automationId: number, selectedStoreId: number) => {
    setIsRunning(true);
    await handleStartAutomation(automationId, selectedStoreId);
    setIsRunning(false);
  };

  // State to track stopping
  const [isStopping, setIsStopping] = useState(false);

  const handleStopAutomation = async (
    automationId: number,
    shop_id: number
  ) => {
    const result = await dispatch(
      stopAutomation({
        automation_id: automationId,
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
      getAutomations({
        shop_id: shop_id,
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
      deleteAutomation({
        automation_id: automationId,
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
      getAutomations({
        shop_id: shop_id,
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
  const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'automation_name',
          key: 'automation_name',
          fixed: 'left',
          ...getColumnSearchProps('automation_name'),
        },
        {
          title: 'Type',
          dataIndex: 'automation_type',
          key: 'automation_type',
          filters: [
            {
              text: 'Message + Product Card',
              value: 'Message + Product Card',
            },
            {
              text: 'Message + Target Collab',
              value: 'Message + Target Collab',
            },
            {
              text: 'Message',
              value: 'Message',
            }
          ],
          onFilter: (value, record) => record.automation_type.startsWith(value as string),
          filterSearch: true,
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
          title: 'Creators Reached',
          dataIndex: 'sent_messages',
          key: 'sent_messages',
          sorter: (a, b) => parseInt(a.sent_messages, 10) - parseInt(b.sent_messages, 10),
        },
        {
            title: 'Creators Remaining',
            key: 'remaining_creators',
            dataIndex: 'remaining_creators',
            sorter: (a, b) => parseInt(a.remaining_creators, 10) - parseInt(b.remaining_creators, 10),
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          width:"150px",
          fixed: 'right',
          render: (status: string) => {
            let color = 'green';
            let displayText = 'Running';
            
            if (status === 'inactive') {
              color = 'red';
              displayText = 'Stopped';
            } else if (status === 'paused') {
              color = 'yellow';
              displayText = 'Paused by limit';
            }
          
            return (
              <Tag color={color} key={status}>
                {displayText}
              </Tag>
            );
          },
          filters: [
            {
              text: 'Running',
              value: 'active',
            },
            {
              text: 'Stopped',
              value: 'inactive',
            },
            {
              text: 'Paused by limit',
              value: 'paused',
            },
          ],
          onFilter: (value, record) => record.status.startsWith(value as string),
          filterSearch: true,
        },
        {
          title: 'Actions',
          key: 'action',
          fixed: 'right',
          width: "240px",
          render: (text, record) => (
            <AutomationListActions
              record={record}
              isRunning={isRunning} // Pass any additional props you need
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
      <h3 className="font-semibold text-xl mb-4">Active Automations:</h3>
      <div className="flex justify-center items-center mt-10">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={tableDataLoading}
          pagination={{ showSizeChanger: true, pageSizeOptions: ['5','10', '20'], defaultPageSize:5}}
          scroll={{ x: 1100 }}
        />
      </div>
    </div>
  );
};

export default AutomationList;