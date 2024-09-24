

import React, { useState, useEffect } from "react";
import AutomationList from "./components/AutomationList";
import AddNewAutomationForm from "./components/AddNewAutomationForm";
import { getAutomations } from "../store/automation";
import { useAppDispatch, useAppSelector } from "../hooks";
import ViewAutomationDetails from "./components/ViewAutomationDetails";
import EditAutomationDetails from "./components/EditAutomationDetails";
import Layout from './layout';

const Automations = () => {
  const automation = useAppSelector((state) => state.automation);
  const auth = useAppSelector((state) => state.auth);
  const shops = useAppSelector((state) => state.shops);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(auth?.meInfo?.customer_id && shops.selectedStoreId){
      dispatch(
        getAutomations({
          shop_id: shops.selectedStoreId,
        })
      );
    }

  }, [auth, shops.selectedStoreId]);

  const [pageContentType, setPageContentType] = useState("automations");
  const [selectedAutomation, setSelectedAutomation] = useState(null);

  const handleRowClick = (automation) => {
    setSelectedAutomation(automation);  // Set the selected automation
    setPageContentType('viewAutomationDetails');  // Change the page content type
  };

  return (
    <Layout>
        <div>
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-stroke border-gray-300">
        <h1 className="text-2xl text-blue-500 font-bold">Automations</h1>
        <button
          className="automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out mr-4"
          onClick={() => setPageContentType("add_new_automations")}
        >
          Create New Automation
        </button>
      </div>
      {pageContentType === "automations" ? (
        <AutomationList
          automations={automation.data}
          isAutomationsLoading={automation.loading}
          onRowClick={handleRowClick} 
        />
      ) : pageContentType === "viewAutomationDetails" ? (
        <ViewAutomationDetails
          automationData={selectedAutomation}
          onReturn={() => setPageContentType("automations")}
          onEdit={() => setPageContentType("editAutomationDetails")}
        />
      ) : pageContentType === "editAutomationDetails" ? (
        <EditAutomationDetails
          automationData={selectedAutomation}
          onReturn={() => setPageContentType("automations")}
        />
      ) : (
        <AddNewAutomationForm
          onReturn={() => setPageContentType("automations")}
          automationData={selectedAutomation}
        />
      )}
    </div>
    </Layout>
  
  );
};

export default Automations;
