import React from "react";
import { Table } from "antd";

interface DataType {
  key: string; // Ensure each data object has a unique key
  [key: string]: any; // Allows for flexible properties in the data
}

interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: DataType) => React.ReactNode; // Optional render function for custom rendering
}

interface CustomTableProps {
  data: DataType[];
  loading?: boolean;
  columns: ColumnType[];
  tableClassName?: string; // Use string type for className
  rowSelection?: any
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  loading = false,
  columns,
  tableClassName = "",
  rowSelection
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 5 }}
      className={tableClassName}
      rowSelection={rowSelection}
    />
  );
};

export default CustomTable;
