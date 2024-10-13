import Announcements from "../income/components/Announcements";
 import AttendanceChartContainer from "../income/components/AttendanceChartContainer";
 import CountChartContainer from "../income/components/CountChartContainer";
 import EventCalendarContainer from "../income/components/EventCalendarContainer";
 import FinanceChart from "../income/components/FinanceChart";
import UserCard from "../income/components/UserCard";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          {/* <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" /> */}
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
             <CountChartContainer /> 
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
             <AttendanceChartContainer />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
           <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
          {/* <EventCalendarContainer searchParams={searchParams}/> */}
         <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
