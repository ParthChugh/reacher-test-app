import React from "react";
import { Button, Card } from "antd";
import { AiOutlinePlayCircle } from "react-icons/ai";

// Define the type for each detail entry
interface DetailEntry {
  title: string;
  value: string | number;
}

// Define the prop type for the component
interface AutomationOverviewProps {
  details: DetailEntry[];
  automationName: string;
  onClick: () => void;
}

const AutomationOverview: React.FC<AutomationOverviewProps> = ({
  details,
  automationName,
  onClick,
}) => {
  return (
    <div className="p-4">
      {/* Start Automations Button */}
      <Button
        type="default"
        className="flex items-center bg-black text-white mb-4 px-4 py-2"
        icon={<AiOutlinePlayCircle size={16} className="mr-2" />}
        onClick={onClick}
      >
        Start Automations
      </Button>

      {/* Automation Overview Section */}
      <h2 className="text-lg font-semibold mb-2">Automation overview</h2>
      <p className="text-gray-600 mb-4">"{automationName}"</p>

      {/* Dynamically Render Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {details.map((entry, index) => (
          <Card key={index} title={entry.title} className="shadow-sm">
            <p className="text-gray-500">{entry.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AutomationOverview;
