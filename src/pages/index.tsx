

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import withAuth from "./components/withAuth";
import StatsCard from "./components/dashboard/StatsCard";
import DashboardSkeleton from "./components/skeletons/DashboardSkeleton";
import CreatorsMessagePerDayChart from "./components/dashboard/CreatorsMessagePerDayChart";
import SelectField from "./components/forms/SelectField";
import { getStatisticsAndCharts } from "./store/statistics";
import { useAppDispatch, useAppSelector } from "./hooks";
import { FiMessageCircle, FiSend, FiUsers } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { PATH } from "./constants/path";
import { useNavigate } from "react-router-dom";
import withShop from "./components/withShop";
import withAdmin from "./components/withAdmin";
import { Tabs } from "antd";
import MessagedCreators from "./messagedcreators";
import EmailedCreators from "./emailedcreators";

const STATS_TIME_PERIOD_OPTIONS = [
  {
    label: "Last 7 days",
    value: "7",
  },
  {
    label: "Last 30 days",
    value: "30",
  },
  {
    label: "All time",
    value: "all",
  },
];

const getDateRange = (period: string) => {
  let startDate = dayjs()
    .subtract(parseInt(period), "day")
    .format("YYYY-MM-DD");
  let endDate = dayjs().format("YYYY-MM-DD");
  if (period === "all") {
    startDate = ""; // Set to empty string for all time
  }
  return { startDate, endDate };
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const shops = useAppSelector((state) => state.shops);
  const statistics = useAppSelector((state) => state.statistics);
  const dispatch = useAppDispatch();

  const [statsTimePeriodValue, setStatsTimePeriodValue] = useState("7");
  const { startDate, endDate } = getDateRange(statsTimePeriodValue);

  useEffect(() => {
    if (!auth.isLogin && !auth.loading) {
      navigate(PATH.auth.login);
    } else if (auth.isLogin && shops.selectedStoreId !== null && shops.selectedStoreId !== undefined && !statistics.loading) {
      console.log("Fetching statistics and charts from dashboard", shops.selectedStoreId, shops.selectedStoreName)
      const payload = {
        shop_id: shops.selectedStoreId,
        start_date: statsTimePeriodValue !== "all" ? startDate : undefined,
        end_date: statsTimePeriodValue !== "all" ? endDate : undefined,
      };
      dispatch(getStatisticsAndCharts(payload));
    }
    console.log("MeInfo: ", auth.meInfo);
  }, [auth, statsTimePeriodValue, startDate, endDate, shops.selectedStoreId]);

  const handleStatsTimePeriodValueChange = (value?: string) => {
    setStatsTimePeriodValue(value || "7");
  };

  if (auth.loading || shops.loadSuccess === null || shops.isFetching || shops.isCreating) {
    return <DashboardSkeleton />;
  }

  const tabsItems = [
    {
      label: "Overall Analytics",
      key: '1',
      children:       
      <>
      {statistics.loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="w-1/3 stats-select mb-9">
            <SelectField
              options={STATS_TIME_PERIOD_OPTIONS}
              onChange={(value) => handleStatsTimePeriodValueChange(value)}
              value={statsTimePeriodValue}
              selectClassName="rounded-3xl dashboard-stats-select"
            />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
            <StatsCard
              data={statistics.statsCountData?.automations?.num_messages}
              label="# of Creators Messaged"
              icon={<FiSend className="text-gray-800" size={24} />}
              clasName="dashboard-stats-counts-icons-sent-bg"
            />
            <StatsCard
              data={statistics.statsCountData?.automations?.num_automations}
              label="# of Active Automations"
              icon={<RiRobot2Line className="text-gray-800" size={24} />}
              clasName="dashboard-stats-counts-icons-bots-bg"
            />
            <StatsCard
              data={statistics.statsCountData?.automations?.num_replies}
              label="# of Creators Replied"
              icon={<FiMessageCircle className="text-gray-800" size={24} />}
              clasName="dashboard-stats-counts-icons-replies-bg"
            />
            <StatsCard
              data={statistics.statsCountData?.automations?.engagement_rate}
              label="Engagement Rate"
              icon={<FiUsers className="text-gray-800" size={24} />}
              clasName="dashboard-stats-counts-icons-engagement-bg"
            />
          </div>
          <div className="mt-44 grid-cols-12 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
            <CreatorsMessagePerDayChart
              title="Daily Creators Messaged"
              seriesData={Object.values(statistics.messagesChartData || {})}
              categories={Object.keys(statistics.messagesChartData || {})}
              label="Creators Messaged"
            />
            <CreatorsMessagePerDayChart
              title="Daily Creators Replied"
              seriesData={Object.values(statistics.repliesChartData || {})}
              categories={Object.keys(statistics.repliesChartData || {})}
              label="Creators Replied"
            />
          </div>
        </>
      )}
      </>
    },
    {
        label: "Messaged Creators",
        key: '2',
        children: <MessagedCreators/>,
        disabled: statistics.loading,
    },
    {
      label: "Emailed Creators",
      key: '3',
      children: <EmailedCreators/>,
      disabled: statistics.loading,
  }
  ];

  return (
    <div>
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-stroke border-gray-300">
        <h1 className="text-2xl font-bold text-blue-500">Analytics Dashboard</h1>
      </div>
      <Tabs
          type="card"
          items={tabsItems}
          destroyInactiveTabPane={true}
      />
    </div>
  );
};

export default withAuth(withAdmin(withShop(Dashboard)));