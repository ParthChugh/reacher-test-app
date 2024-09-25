import { useState } from "react";
import { LuBook } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  MdMoreVert,
  MdOutlineAdd,
  MdOutlinePlayArrow,
  MdOutlinePause,
} from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "antd";
import CustomTable from "../../common/table";
import SearchComponent from "../../common/search";
import IconButton from "../../common/button";
import Layout from "./layout";
import CustomFilters from "../customFilter/customFilters";
import FilterFooter from "../customFilter/customFilterFooter";
import initialFilters from "./mockData/after_group_filters.json";
import data from "./mockData/creators.json";
import {
  updateFilters,
  convertToURLSearchParams,
  getSelectedFilters,
  getSelectedColumns,
} from "./helper";
import CustomModal from "../../common/modal";
import ColumnSelector from "./columnSelector";
import initialColumns from "./mockData/columns.json";

const Groups = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const [tableColumns, setTableColumns] = useState(initialColumns);

  const [openfiltersDrawer, setOpenFiltersDrawer] = useState(false);
  const [creatorsData] = useState(data);
  const [filters, setFilters] = useState<any>(
    updateFilters(initialFilters, paramsObject)
  );

  const handleSearch = (query: string) => {
    console.log("Search Query:", query);
    // Perform search or call an API with the query
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
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      render: (text, record) => (
        <Link
          className="font-medium cursor-pointer"
          to={`/groups/${record.key}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Group Conditions",
      dataIndex: "groupConditions",
      key: "groupConditions",
      render: (text) => (
        <div className="relative group">
          <span className="text-blue-500 cursor-pointer">{text}</span>
          <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded">
            <p>Status: Content Pending</p>
            <p>GMV: $0-$100 AND $100-$1000</p>
          </div>
        </div>
      ),
    },
    {
      title: "No. of Creators",
      dataIndex: "creatorsCount",
      key: "creatorsCount",
      render: (count) => <span>{count}</span>,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "Group GMV",
      dataIndex: "groupGmv",
      key: "groupGmv",
      render: (gmv) => <span className="font-medium">${gmv}</span>,
    },
    {
      title: "Automation Status",
      dataIndex: "automationStatus",
      key: "automationStatus",
      render: (status) => (
        <span
          className={`px-3 py-1 rounded ${
            status === "Active"
              ? "bg-green-100 text-green-800"
              : status === "Stopped"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (action) => (
        <div className="flex space-x-2">
          {action === "add" && (
            <button className="bg-gray-200 p-1 rounded" onClick={() => {}}>
              <MdOutlineAdd size={20} />
            </button>
          )}
          {action === "play" && (
            <button className="bg-gray-200 p-1 rounded" onClick={() => {}}>
              <MdOutlinePlayArrow size={20} />
            </button>
          )}

          {action === "pause" && (
            <button className="bg-gray-200 p-1 rounded" onClick={() => {}}>
              <MdOutlinePause size={20} />
            </button>
          )}
          <button className="bg-gray-200 p-1 rounded" onClick={() => {}}>
            <MdMoreVert size={20} />
          </button>
        </div>
      ),
    },
  ];

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
                navigate(`/groups`, { replace: true });
                navigate(0);
              }}
              onApplyFilters={() => {
                const selectedFilters = getSelectedFilters(filters);
                const urlParams = convertToURLSearchParams(selectedFilters);

                // Example of how to get the string representation for a URL
                navigate(`/groups?${urlParams.toString()}`, {
                  replace: true,
                });
                setOpenFiltersDrawer(false);
              }}
            />
          </>
        }
      />
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">Groups</h3>
        <div className="flex">
          <div className="flex items-center mr-2">
            <LuBook className="mr-1 text-gray-20" />
            <h3 className="text-l text-gray-20 mr-2">View Tutorial</h3>
          </div>
          <IconButton
            label="Create a group"
            onClick={() => {
              navigate("/groups/create");
            }}
            icon={<PlusOutlined />} // Add the plus icon to the left
            buttonClass="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md" // Tailwind classes for styling
            textClass="text-sm font-medium" // Additional text styling if needed
          />
        </div>
      </div>
      <div className="flex justify-between flex-wrap mt-5">
        <div className="mt-4">
          <SearchComponent
            onSearch={handleSearch}
            placeholder="Search by group name or product name"
            inputStyle={{ width: 372, height: 48 }}
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
      <CustomTable columns={columns} data={creatorsData} loading={false} />
    </Layout>
  );
};

export default Groups;
