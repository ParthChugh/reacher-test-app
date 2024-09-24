

import { Spinner } from "@material-tailwind/react";
import React from "react";

interface TableCell {
  id: string;
  label: string;
  renderColumnContent?: (dataItem: any) => React.ReactNode; // Function to render custom content
  renderColumn?: (dataItem: any) => React.ReactNode; // Function to render custom content
  renderHeaderColumn?: (dataItem: any) => React.ReactNode; // Function to render custom content
}

interface TableProps {
  data: any[];
  tableHeaderCells: TableCell[];
  isLoading?: boolean;
}

const Table: React.FC<TableProps> = ({
  data = [],
  tableHeaderCells = [],
  isLoading,
}) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-9 border-b  border-gray-300 border-stroke">
        {tableHeaderCells && tableHeaderCells.length
          ? tableHeaderCells.map((item, i) => {
              if (item.renderHeaderColumn) {
                return item.renderHeaderColumn(item);
              }
              return (
                <div className="p-2 xl:p-5" key={item.id}>
                  {item.label}
                </div>
              );
            })
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
              className="grid grid-cols-3 border-b border-gray-300 border-stroke sm:grid-cols-9 items-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
              key={item._id}
            >
              {tableHeaderCells.map((tableCell) => {
                if (tableCell.renderColumn) {
                  return tableCell.renderColumn(item);
                }
                return (
                  <div
                    key={`${item._id}${tableCell.id}`}
                    className="flex p-2.5 xl:p-5"
                  >
                    {tableCell.renderColumnContent ? (
                      tableCell.renderColumnContent(item) // If custom render function is provided, use it
                    ) : (
                      <p>{item[tableCell.id]}</p> // Otherwise, render normal content: ;
                    )}
                  </div>
                );
              })}
            </div>
          ))
        : null}
    </div>
  );
};

export default Table;
