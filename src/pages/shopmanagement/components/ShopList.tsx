
import React, { useEffect, useState } from "react";
import SearchField from "../../components/forms/SearchField";
import { useAppSelector } from "../../hooks";
import UpdateShopNameModal from "./UpdateShopNameModal";
import DeleteShopModal from "./DeleteShopModal";
import ShopTable from "./ShopTable";
import UploadShopCreatorsListToOmitModal from "./UploadShopCreatorsListToOmitModal";

interface ShopListProps {
    // ToDo add if necessary
}

const ShopList: React.FC<ShopListProps> = ({
    // ToDo add if necessary 
}) => {
    const shops = useAppSelector((state) => state.shops);
  
    // State to store the filtered list based on user input
    const [filteredShops, setFilteredShops] = useState(shops.shops);
    // Handler for filtering data based on user input
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.toLowerCase();
      const filteredList = shops.shops.filter(
        (item: any) =>
          item.shop_name.toLowerCase().includes(inputValue)
      );
      console.log("Applied shop filter depending on name",filteredList);
      setFilteredShops(filteredList);
    };

    useEffect(() => {
        setFilteredShops(shops.shops);
    }, [shops.shops]);

    const tableHeaderCells = [
        {
          id: 'shop_id',
          label: 'Shop ID',
          textAlign: 'left', // Left align
          width: '1fr', // Less space
          renderColumnContent: (dataItem: any) => (
            <div className="flex justify-center items-center w-full">
              <p>{dataItem.shop_id}</p>
            </div>
          ),
          renderHeaderColumn: () => (
            <div className="flex font-bold justify-center items-center w-full">
              Shop ID
            </div>
          ),
        },
        {
          id: 'shop_name',
          label: 'Shop Name',
          textAlign: 'center', // Center align
          width: '4fr', // More space
          renderColumnContent: (dataItem: any) => (
            <div className="flex justify-center items-center w-full">
              <p>{dataItem.shop_name}</p>
            </div>
          ),
          renderHeaderColumn: () => (
            <div className="flex font-bold justify-center items-center w-full">
              Shop Name
            </div>
          ),
        },
        {
          id: 'actions',
          label: 'Actions',
          textAlign: 'center', // Right align
          width: '3fr', // Default space
          renderColumn: (dataItem: any) => (
            <div className="flex space-x-2 justify-center items-center w-full">
              <UpdateShopNameModal oldShopName={dataItem.shop_name} shopId={dataItem.shop_id} />
              <UploadShopCreatorsListToOmitModal oldShopName={dataItem.shop_name} shopId={dataItem.shop_id} creators_to_omit={dataItem.creators_to_omit} />
              <DeleteShopModal oldShopName={dataItem.shop_name} shopId={dataItem.shop_id} />
            </div>
          ),
          renderHeaderColumn: () => (
            <div className="flex font-bold justify-center items-center w-full">
              Actions
            </div>
          ),
        },
    ];

    return (
        <div className="ml-6 mt-10">
            <h3 className="font-semibold text-xl mb-4">Current Shops:</h3>
            <div className="mb-4 max-w-md">
                <SearchField placeholder="Search shops..." onChange={handleSearch} />
            </div>
            <ShopTable
                data={filteredShops}
                tableHeaderCells={tableHeaderCells}
                isLoading={shops.isFetching}
            />
        </div>
    )
};

export default ShopList;
