// ColumnSelector.tsx
import React from "react";
import { Popover, Checkbox, Button } from "antd";
import IconButton from "../../common/button";

interface Column {
  label: string;
  field: string;
  selected: boolean;
  order: number;
}

interface ColumnSelectorProps {
  columns: Column[];
  onUpdate: (updatedColumns: Column[]) => void;
  restProps: any;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  onUpdate,
  restProps,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [selectedColumns, setSelectedColumns] =
    React.useState<Column[]>(columns);

  React.useEffect(() => {
    setSelectedColumns(columns); // Update state when props change
  }, [columns]);

  const handleCheckboxChange = (field: string, checked: boolean) => {
    const updatedColumns = selectedColumns.map((col) =>
      col.field === field ? { ...col, selected: checked } : col
    );
    setSelectedColumns(updatedColumns);
  };

  const handleSave = () => {
    onUpdate(selectedColumns);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const popoverContent = (
    <div>
      {selectedColumns.map((column) => (
        <div key={column.field} className="flex items-center my-1">
          <Checkbox
            checked={column.selected}
            onChange={(e) =>
              handleCheckboxChange(column.field, e.target.checked)
            }
          >
            {column.label}
          </Checkbox>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <Button type="link" onClick={handleSave}>
          Save
        </Button>
        <Button type="link" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );

  if (restProps.showPopOver) {
    return (
      <Popover
        content={restProps.showPopOver && popoverContent}
        title="Columns"
        trigger="click"
        visible={visible}
        onVisibleChange={(visible) => setVisible(visible)}
        placement="bottomLeft"
      >
        <IconButton {...restProps} />
      </Popover>
    );
  }
  return <IconButton {...restProps} />;
};

export default ColumnSelector;
