import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
// import { getSession } from 'next-auth/react';
import { getEmailAutomations } from "../store/emailAutomations";
import EmailAutomationsList from "./components/EmailAutomationsList";
import ViewEmailAutomationDetails from "./components/ViewEmailAutomationDetails";
import AddNewEmailAutomationForm from "./components/AddNewEmailAutomationForm";
import EditEmailAutomationDetails from "./components/EditEmailAutomationDetails";
import clientService from "../helpers/client";
import { message } from "antd";
// import { signOut } from 'next-auth/react';
import ManageEmails from "./components/ManageEmails";
import Layout from "./layout";

const EmailAutomations = () => {
  const emailAutomations = useAppSelector((state) => state.emailAutomations);
  const auth = useAppSelector((state) => state.auth);
  const shops = useAppSelector((state) => state.shops);
  const dispatch = useAppDispatch();

  const [pageContentType, setPageContentType] = useState("email_automations");
  const [selectedEmailAutomation, setSelectedEmailAutomation] = useState(null);

  const emailAddedRef = useRef(false);

  useEffect(() => {
    if (auth?.meInfo?.customer_id && shops.selectedStoreId) {
      dispatch(
        getEmailAutomations({
          shop_id: shops.selectedStoreId,
        })
      );
    }
  }, [auth, shops.selectedStoreId]);

  useEffect(() => {
    const addEmail = async () => {
      if (emailAddedRef.current) return;
      emailAddedRef.current = true;
      const session = await getSession();
      const shopId = localStorage.getItem("tempShopId");

      if (
        session?.accessToken &&
        session?.refreshToken &&
        session?.email &&
        shopId
      ) {
        try {
          await clientService.post("/api/manage_emails/add", {
            shop_id: shopId,
            account: session.email,
            access_token: session.accessToken,
            refresh_token: session.refreshToken,
          });
          message.success("Email account added successfully");
          setPageContentType("manage_emails");

          await signOut({ redirect: false });
          localStorage.removeItem("tempShopId");
        } catch (error) {
          console.error("Error adding email account:", error);
          message.error("Failed to add email account");
        }
      } else {
        console.log("Missing required data:", { session, shopId });
      }
      emailAddedRef.current = false;
    };

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("addEmail") === "true") {
      addEmail();
    } else {
    }
  }, []);

  const handleRowClick = (email_automation) => {
    // This function used to be for row click, now its used for the view button in the table
    setSelectedEmailAutomation(email_automation); // Set the selected automation
    setPageContentType("viewEmailAutomationDetails"); // Change the page content type
  };

  const refreshEmailAutomations = () => {
    if (shops.selectedStoreId) {
      dispatch(getEmailAutomations({ shop_id: shops.selectedStoreId }));
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stroke border-gray-300">
          <h1 className="text-2xl text-blue-500 font-bold">
            Email Automations
          </h1>
          <div>
            <button
              className="automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out mr-4"
              onClick={() => setPageContentType("add_new_automations")}
            >
              Create New Automation
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out mr-4"
              onClick={() => setPageContentType("manage_emails")}
            >
              Manage Emails
            </button>
          </div>
        </div>
        {pageContentType === "email_automations" ? (
          <EmailAutomationsList
            automations={emailAutomations.data}
            isAutomationsLoading={emailAutomations.loading}
            onRowClick={handleRowClick}
          />
        ) : pageContentType === "viewEmailAutomationDetails" ? (
          <ViewEmailAutomationDetails
            automationData={selectedEmailAutomation}
            onReturn={() => setPageContentType("email_automations")}
            onEdit={() => setPageContentType("editEmailAutomationDetails")}
          />
        ) : pageContentType === "editEmailAutomationDetails" ? (
          <EditEmailAutomationDetails
            automationData={selectedEmailAutomation}
            onReturn={() => setPageContentType("email_automations")}
          />
        ) : pageContentType === "add_new_automations" ? (
          <AddNewEmailAutomationForm
            onReturn={() => setPageContentType("email_automations")}
          />
        ) : pageContentType === "manage_emails" ? (
          <ManageEmails
            onReturn={() => setPageContentType("email_automations")}
            onRefresh={refreshEmailAutomations}
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default EmailAutomations;
