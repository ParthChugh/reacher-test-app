import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tag, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import CustomTable from "../../common/table";
import IconButton from "../../common/button";
import Layout from "./layout";
import CustomFilters from "../customFilter/customFilters";
import initialFilters from "./mockData/create_group.json";

import data from "./mockData/singleColumn.json";
import { getSelectedFilters } from "./helper";
import CustomInput from "../../common/input";
import CustomModal from "../../common/modal";
import { Spin } from "antd";

const Groups = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [filters, setFilters] = useState<any>(initialFilters);
  const [loading, setLoading] = useState<any>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    const userConfirmed = window.confirm(
      "Caution: Proceeding may cause loss of unsaved data. Do you want to continue?"
    );
    setLoading(true)
    if (userConfirmed) {
      setIsModalVisible(false);
      setGroupName("");
      setFilters(initialFilters);
    } else {
      setIsModalVisible(false);
    }
    setLoading(false)
  };

  const handleConfirm = () => {
    // Handle confirmation logic here, like redirecting to another step
    setIsModalVisible(false);
    // call API here
    navigate("/automations");
  };

  const onClickDiscard = () => {
    const userConfirmed = window.confirm(
      "Caution: Proceeding may cause loss of unsaved data. Do you want to continue?"
    );

    if (userConfirmed) {
      setIsModalVisible(false);
      setGroupName("");
      setFilters(initialFilters);
      navigate("/groups");
    } else {
      setIsModalVisible(false);
    }
  };

  const selectedFilters = getSelectedFilters(filters);
  console.log("selectedFilters12321", selectedFilters);
  const columns = [
    {
      title: "Creator name",
      dataIndex: "creator",
      key: "creator",
      render: (creator: {
        name: string;
        description: string;
        profile: string;
      }) => (
        <div className="flex items-center">
          <img
            src={creator.profile}
            alt={creator.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <div className="font-medium">{creator.name}</div>
            <div className="text-gray-500">{creator.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <div className="flex gap-1">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              className="bg-gray-200 text-black px-2 py-1 rounded"
            >
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span className="bg-black text-white px-3 py-1 rounded-md">
          {status}
        </span>
      ),
    },
    {
      title: (
        <div className="flex items-center">
          GMV
          <Tooltip title="Gross Merchandise Value">
            <InfoCircleOutlined className="ml-1 text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: "gmv",
      key: "gmv",
      render: (gmv: string) => <span>${gmv.toLocaleString()}</span>,
    },
  ];

  return (
    <Layout>
      <CustomModal
        visible={isModalVisible}
        title="Create group"
        onCancel={handleCancel}
        className="custom-modal"
        width={400} // Adjust the width if needed
        content={
          <div>
            <p>
              <strong>{`"${groupName}"`}</strong> created successfully. Do you
              wish to continue to step 2 and set automations?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                onClick={handleCancel}
                className="bg-gray-200 w-full"
                style={{ height: 40 }}
              >
                I'll do it later!
              </Button>
              <Button
                className="bg-black text-white w-full"
                style={{ height: 40 }}
                onClick={handleConfirm}
              >
                Set Automation
              </Button>
            </div>
          </div>
        }
      />
      {!loading ? (
        <>
          <div className="flex justify-between items-center mb-10 ">
            <h3 className="font-semibold text-xl">Create Group</h3>
            <div className="flex">
              <div
                className="flex items-center mr-2 cursor-pointer"
                onClick={() => {
                  onClickDiscard();
                }}
              >
                <h3 className="text-l text-gray-20 mr-2">Discard</h3>
              </div>
              <IconButton
                label="Create group"
                onClick={() => {
                  setIsModalVisible(true);
                }}
                buttonClass={
                  "bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                } // Tailwind classes for styling
                textClass="text-sm font-medium" // Additional text styling if needed
                restProps={{
                  disabled:
                    groupName === "" ||
                    Object.keys(selectedFilters).length === 0,
                }}
              />
            </div>
          </div>
          <div className="flex h-screen">
            <div className="flex-1 mr-5">
              <CustomInput
                label="Group name"
                value={groupName}
                onChange={setGroupName}
                placeholder="Enter group name"
              />
              {selectedFilters && (
                <h4 className="mb-4 font-bold">
                  Set conditions ({Object.keys(selectedFilters).length})
                </h4>
              )}

              <CustomFilters
                filters={filters}
                setFilters={setFilters}
                labelStyles={{ fontSize: "14px" }}
                selectedClassName="text-white"
                optonClassName="text-grayCustom text-custom-16"
              />
            </div>
            <div className="flex-2 items-center justify-center ml-5">
              <div className="flex items-center justify-center">
                <span className="text-grayCustom">Total creators preview:</span>
                <span>&nbsp;{data["1"].details.length}</span>
              </div>

              <CustomTable
                columns={columns}
                data={data["1"].details}
                loading={false}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mr-3">
          <Spin
            size="small" // Adjusts the spinner size to be similar to "h-5 w-5"
            style={{
              color: '#3B82F6', // Hex code for light blue; adjust as needed
              fontSize: '20px', // Controls the spinner size
            }}
            onMouseEnter={() => {}} // Equivalent to onPointerEnterCapture, modify as needed
            onMouseLeave={() => {}} // Equivalent to onPointerLeaveCapture, modify as needed
          />
        </div>
      )}
    </Layout>
  );
};

export default Groups;
