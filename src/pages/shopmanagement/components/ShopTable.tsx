

import { Spinner } from "@material-tailwind/react";
import React from "react";

interface TableCell {
  id: string;
  label: string;
  renderColumnContent?: (dataItem: any) => React.ReactNode; // Function to render custom content
  renderColumn?: (dataItem: any) => React.ReactNode; // Function to render custom content
  renderHeaderColumn?: (dataItem: any) => React.ReactNode; // Function to render custom content
  textAlign?: 'left' | 'center' | 'right'; // Text alignment
  width?: string; // Width for the column
}

interface ShopTableProps {
  data: any[];
  tableHeaderCells: TableCell[];
  isLoading?: boolean;
}

const ShopTable: React.FC<ShopTableProps> = ({
  data = [],
  tableHeaderCells = [],
  isLoading,
}) => {
  const columnWidths = tableHeaderCells.map((cell) => cell.width || '1fr').join(' ');

  return (
    <div className="flex flex-col">
      <div className={`grid rounded-sm bg-gray-2 border-b border-gray-300 border-stroke`} style={{ gridTemplateColumns: columnWidths }}>
        {tableHeaderCells && tableHeaderCells.length
          ? tableHeaderCells.map((item) => (
              <div
                className={`p-2.5 xl:p-5 ${item.textAlign ? `text-${item.textAlign}` : 'text-left'}`}
                key={item.id}
              >
                {item.renderHeaderColumn ? item.renderHeaderColumn(item) : item.label}
              </div>
            ))
          : null}
      </div>
      {isLoading && !Boolean(data.length) && (
        <div className="mt-48 w-full flex justify-center">
          <Spinner className="h-12 w-12" color="blue" />
        </div>
      )}
      {data && data.length
        ? data.map((item) => (
            <div
              className={`grid border-b border-gray-300 border-stroke items-center hover:bg-gray-100 transition duration-300 ease-in-out`}
              style={{ gridTemplateColumns: columnWidths }}
              key={item._id}
            >
              {tableHeaderCells.map((tableCell) => (
                <div
                  key={`${item._id}${tableCell.id}`}
                  className={`flex p-2.5 xl:p-5 ${tableCell.textAlign ? `text-${tableCell.textAlign}` : 'text-left'}`}
                >
                  {tableCell.renderColumn
                    ? tableCell.renderColumn(item)
                    : tableCell.renderColumnContent
                    ? tableCell.renderColumnContent(item)
                    : <p>{item[tableCell.id]}</p>}
                </div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
};

export default ShopTable;