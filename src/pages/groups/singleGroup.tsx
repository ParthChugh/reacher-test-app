import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Tag, Select, Badge } from "antd";
import { IoChevronBack } from "react-icons/io5";
import CustomTable from "../../common/table";
import IconButton from "../../common/button";
import Layout from "./layout";
import initialFilters from "./mockData/after_group_filters.json";
import data from "./mockData/singleColumn.json";
import {
  convertToURLSearchParams,
  getSelectedFilters,
  updateFilters,
} from "./helper";
import CustomModal from "../../common/modal";
import { LuTrash2 } from "react-icons/lu";
import { HiOutlinePencil } from "react-icons/hi2";
import AutomationOverview from "./automation";
import CustomFilters from "../customFilter/customFilters";
import FilterFooter from "../customFilter/customFilterFooter";
import { CiFilter } from "react-icons/ci";
import ColumnSelector from "./columnSelector";

const { Option } = Select;

// Define the type for each detail entry
interface DetailEntry {
  title: string;
  value: string | number;
}

const SingleGroup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddTagModalVisible, setIsAddTagModalVisible] = useState(false);
  const tags = [
    { value: "tag1", label: "Tag 1", selected: false },
    { value: "tag2", label: "Tag 2", selected: false },
    { value: "tag3", label: "Tag 3", selected: false },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [openfiltersDrawer, setOpenFiltersDrawer] = useState(false);
  const [createTag, setCreateTag] = useState(false);
  const [creatorsData] = useState(data[id]);
  const [filters, setFilters] = useState<any>(
    updateFilters(initialFilters, paramsObject)
  );
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("Selected row keys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleMultiSelectChange = (values: string[]) => {
    setSelectedTags(values);
  };

  const filtersItems = [
    {
      name: "Group Filters",
      handleClick: () => {
        setOpenFiltersDrawer(true);
      },
      icon: <CiFilter color={"#1E1E1E"} />,
      badge: Object.keys(paramsObject).length,
    },
  ];

  const columns = [
    {
      title: "TikTok Handle",
      dataIndex: "creator",
      key: "creator",
      render: (creator) => (
        <div className="flex items-center">
          <img
            src={creator.profile}
            alt={creator.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <div>{creator.name}</div>
            <div className="text-gray-500">{creator.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <div>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              className="bg-gray-200 text-black px-2 py-1 rounded-lg mr-1"
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
      render: (status) => (
        <span className="bg-black text-white px-5 py-2 rounded-md">
          {status}
        </span>
      ),
    },
    {
      title: "GMV",
      dataIndex: "gmv",
      key: "gmv",
      render: (gmv) => <span className="font-medium">${gmv}</span>,
    },
    {
      title: "Date Entered Group",
      dataIndex: "dateEntered",
      key: "dateEntered",
      render: (date) => <span>{date}</span>,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCancel = () => {
    setIsAddTagModalVisible(false);
  };

  const handleConfirm = () => {
    console.log("Tags added:", tags);
    // Add your tag addition logic here
    setIsAddTagModalVisible(false);
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm(
      "Caution: Proceeding may cause loss of unsaved data. Do you want to continue?"
    );
    if (userConfirmed) {
      navigate('/groups')
    } 
  };

  const automation = !!creatorsData?.automation;
  const automationDetails: DetailEntry[] = creatorsData?.automation?.types;

  return (
    <Layout>
      <CustomModal
        visible={openfiltersDrawer}
        onCancel={() => {
          setOpenFiltersDrawer(false);
        }}
        title={
          <div>
            <div className="mb-2">More Filters</div>
            <div className="border-b-2 border-gray-300 mb-5" />
          </div>
        }
        showModalFooter={false}
        width={700}
        content={
          <>
            <CustomFilters filters={filters} setFilters={setFilters} />
            <FilterFooter
              onClearAll={() => {
                setFilters(filters);
                navigate(`/groups/${id}`, { replace: true });
                navigate(0);
              }}
              onApplyFilters={() => {
                const selectedFilters = getSelectedFilters(filters);
                const urlParams = convertToURLSearchParams(selectedFilters);

                // Example of how to get the string representation for a URL
                navigate(`/groups/${id}?${urlParams.toString()}`, {
                  replace: true,
                });
                setOpenFiltersDrawer(false);
              }}
            />
          </>
        }
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <IoChevronBack
            className="text-xl text-gray-600 cursor-pointer"
            onClick={() => {
              navigate("/groups");
            }}
          />
          <h3 className="font-semibold text-xl">Groups</h3>
        </div>
        <div className="flex">
          <div className="flex space-x-4 mr-4">
            {/* Edit Icon Button */}
            <button className="bg-gray-200 p-2 rounded border border-gray-300">
              <HiOutlinePencil size={20} />
            </button>

            {/* Delete Icon Button */}
            <button
              className="bg-gray-200 p-2 rounded border border-gray-300"
              onClick={() => {
                handleDelete();
              }}
            >
              <LuTrash2 size={20} />
            </button>
          </div>

          <IconButton
            label={`Create ${automation ? "new" : ""} automation`}
            onClick={() => {
              navigate('/automations')
            }}
            icon={<PlusOutlined />} // Add the plus icon to the left
            buttonClass="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md" // Tailwind classes for styling
            textClass="text-sm font-medium" // Additional text styling if needed
            style={{ height: 40 }}
          />
        </div>
      </div>
      {automation && (
        <AutomationOverview
          automationName="Automation Name"
          onClick={() => {}}
          details={automationDetails}
        />
      )}

      <div className="mt-4 mb-8">
        <CustomModal
          visible={isAddTagModalVisible}
          showModalFooter
          title="Batch add tags"
          content={
            <div>
              <p className="text-gray-500">
                Only 3 tags can be added per creator.
              </p>
              <Select
                mode="multiple"
                value={tags
                  ?.filter((option) => selectedTags.includes(option.value))
                  .map((option) => option.value)}
                onChange={(values) =>
                  handleMultiSelectChange(values as string[])
                }
                className="w-full mt-2"
                placeholder="Select tags"
              >
                {tags?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
          }
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          confirmText="Add tags"
          cancelText="Cancel"
          confirmButtonType="primary"
        />
      </div>
      <CustomTable
        columns={columns}
        data={creatorsData.details}
        loading={false}
        rowSelection={createTag && rowSelection}
      />
    </Layout>
  );
};

export default SingleGroup;
