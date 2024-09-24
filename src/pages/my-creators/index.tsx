import { useState } from "react";
import { LuBook } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import { FiColumns } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge, Tag, Select } from "antd";
import CustomTable from "../../common/table";
import SearchComponent from "../../common/search";
import IconButton from "../../common/button";
import Layout from "./layout";
import CustomDrawer from "../../common/drawer";
import CustomFilters from "./customFilters";
import FilterFooter from "./customFilterFooter";
import initialFilters from "./mockData/filters.json";
import data from "./mockData/creators.json";
import {
  updateFilters,
  convertToURLSearchParams,
  getSelectedFilters,
  getSelectedColumns,
} from "./helper";
import CustomButtonGroup from "./CustomButtonGroup";
import CustomModal from "../../common/modal";
import BatchRemoveTagsModal from "./batchRemoveTagsModal";
import ColumnSelector from "./columnSelector";
import initialColumns from "./mockData/columns.json";

const { Option } = Select;

const MyCreators = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tableColumns, setTableColumns] = useState(initialColumns);
  const [isAddTagModalVisible, setIsAddTagModalVisible] = useState(false);
  const [isRemoveModalVisible, setIsRemoveTagModalVisible] = useState(false);
  const tags = [
    { value: "tag1", label: "Tag 1", selected: false },
    { value: "tag2", label: "Tag 2", selected: false },
    { value: "tag3", label: "Tag 3", selected: false },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [openfiltersDrawer, setOpenFiltersDrawer] = useState(false);
  const [createTag, setCreateTag] = useState(false);
  const [creatorsData] = useState(data);
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

  const handleSearch = (query: string) => {
    console.log("Search Query:", query);
    // Perform search or call an API with the query
  };
  const filtersItems = [
    {
      name: "Creator Filters",
      handleClick: () => {
        setOpenFiltersDrawer(true);
      },
      icon: <CiFilter color={"#1E1E1E"} />,
      badge: Object.keys(paramsObject).length,
    },
    {
      name: "Columns",
      handleClick: () => {},
      icon: <FiColumns color={"#1E1E1E"} />,
      showPopOver: true,
    },
  ];

  const columns = [
    {
      title: "Creator Name",
      dataIndex: "creatorName",
      key: "creatorName",
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
      render: (tags: string[]) => (
        <div>
          {tags.length > 0 ? (
            <>
              {tags.map((tag, index) => (
                <Tag
                  key={`tags-${index}`}
                  className="flex items-center text-black px-2 py-1 rounded-lg space-between"
                  closable
                  closeIcon={<AiOutlineClose className="cursor-pointer" />}
                  onClose={() => {}}
                >
                  {tag}
                </Tag>
              ))}
              {createTag ? (
                <div className="m-3" />
              ) : (
                <IconButton
                  label={""}
                  onClick={() => {}}
                  icon={<MdOutlineAdd color={"#1E1E1E"} />}
                  buttonClass="bg-gray-200 border-solid mt-1"
                  textClass="text-black"
                />
              )}
            </>
          ) : createTag ? (
            <span>None</span>
          ) : (
            <IconButton
              label={"Add Tags"}
              onClick={() => {
                handleAddTags();
              }}
              icon={<MdOutlineAdd color={"#1E1E1E"} />}
              buttonClass="bg-gray-200 border-solid"
              textClass="text-black"
            />
          )}
        </div>
      ),
    },
    {
      title: "Name of Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span className={"bg-black text-white px-5 py-2 rounded-md"}>
          {status}
        </span>
      ),
    },
    {
      title: "Video Posted",
      dataIndex: "videoPosted",
      key: "videoPosted",
    },
    {
      title: "Livestreams",
      dataIndex: "livestreams",
      key: "livestreams",
      render: (count: number) => <span>{count} times</span>,
    },
    {
      title: "CFR",
      dataIndex: "cfr",
      key: "cfr",
      render: (value: number) => <span>{value.toFixed(2)}%</span>,
    },
    {
      title: "GMV",
      dataIndex: "gmv",
      key: "gmv",
      render: (gmv: number) => <span>${gmv.toLocaleString()}</span>,
    },
  ];

  const handleAddTags = () => {
    setSelectedTags([]);
    if (selectedRowKeys.length === 0) {
      toast.error("Please select at least one row");
    } else {
      handleOpenModalAdd();
    }
  };

  const handleRemoveTags = () => {
    setSelectedTags([]);
    if (selectedRowKeys.length === 0) {
      toast.error("Please select at least one row");
    } else {
      setIsRemoveTagModalVisible(true);
    }
  };

  const handleExit = () => {
    setCreateTag(false);
    // Add your function logic here
  };

  const buttons = [
    {
      label: "Add tags",
      onClick: handleAddTags,
      type: "primary",
      className: "bg-black",
    },
    {
      label: "Remove tags",
      onClick: handleRemoveTags,
      type: "default",
    },
    { label: "Exit", onClick: handleExit, type: "text" },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOpenModalAdd = () => {
    setIsAddTagModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddTagModalVisible(false);
    setIsRemoveTagModalVisible(false);
  };

  const handleConfirm = () => {
    console.log("Tags added:", tags);
    // Add your tag addition logic here
    setIsAddTagModalVisible(false);
    setIsRemoveTagModalVisible(false);
  };

  const handleUpdateColumns = (updatedColumns: Column[]) => {
    const newColumns = getSelectedColumns(columns, updatedColumns);
    // console.log("newColumns12321321", newColumns);
    // const values = newColumns.map((column) => {
    //   return {
    //     title: column.label,
    //     dataIndex: column.field,
    //     key: column.field,
    //   };
    // });
    
    setTableColumns(updatedColumns);
  };

  return (
    <Layout>
      <CustomDrawer
        visible={openfiltersDrawer}
        onClose={() => {
          setOpenFiltersDrawer(false);
        }}
        Component={() => (
          <CustomFilters filters={filters} setFilters={setFilters} />
        )} // Pass your component here
        Header={() => <div>More Filters</div>} // Pass your component here
        Footer={() => (
          <FilterFooter
            onClearAll={() => {
              setFilters(filters);
              navigate(`/my-creators`, { replace: true });
              navigate(0);
            }}
            onApplyFilters={() => {
              const selectedFilters = getSelectedFilters(filters);
              const urlParams = convertToURLSearchParams(selectedFilters);

              // Example of how to get the string representation for a URL
              navigate(`/my-creators?${urlParams.toString()}`, {
                replace: true,
              });
              setOpenFiltersDrawer(false);
            }}
          />
        )} // Pass your component here
      />
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">My Creators</h3>
        <div className="flex items-center">
          <LuBook className="mr-1 text-gray-20" />
          <h3 className="text-l text-gray-20 mr-2">View Tutorial</h3>
        </div>
      </div>
      <div className="flex justify-between flex-wrap">
        <div className="mt-4">
          <SearchComponent
            onSearch={handleSearch}
            placeholder="Search by name"
            label={"Creator Name"}
          />
        </div>

        <div className="flex mt-4">
          {filtersItems.map((filter, index) => (
            <div
              className="mr-4 hover:bg-black-500 hover:border-black-500 hover:text-white transition duration-300"
              key={`filter-${filter.name}`}
            >
              <Badge count={filter.badge || 0}>
                <ColumnSelector
                  columns={tableColumns}
                  onUpdate={handleUpdateColumns}
                  restProps={{
                    label: filter.name,
                    showPopOver: filter.showPopOver,
                    onClick: filter.handleClick,
                    icon: filter.icon,
                    buttonClass:
                      "bg-gray-200 border-solid border-1 border-black",
                    textClass: "text-black",
                  }}
                />
              </Badge>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 mb-8">
        {!createTag && (
          <IconButton
            label={"Tag creators"}
            onClick={() => {
              setSelectedRowKeys([]);
              setCreateTag(true);
            }}
            buttonClass="bg-black"
            textClass="text-white"
          />
        )}

        <CustomButtonGroup
          buttons={buttons}
          className="mt-4"
          show={createTag}
        />

        <CustomModal
          visible={isAddTagModalVisible}
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
        <BatchRemoveTagsModal
          visible={isRemoveModalVisible}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </div>
      <CustomTable
        columns={columns}
        data={creatorsData}
        loading={false}
        rowSelection={createTag && rowSelection}
      />
    </Layout>
  );
};

export default MyCreators;
