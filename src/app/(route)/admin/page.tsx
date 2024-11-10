import Announcements from "../income/components/Dashboard/Announcements";
import AttendanceChartContainer from "../income/components/Dashboard/AttendanceChartContainer";
import CountChartContainer from "../income/components/Dashboard/CountChartContainer";
import EventCalendarContainer from "../income/components/Dashboard/EventCalendarContainer";
import FinanceChart from "../income/components/Market/FinanceChart";
import UserCard from "../income/components/Dashboard/UserCard";
import { CountryDisplay } from '@/components/flag';


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
          <UserCard type="admin" />
          <UserCard type="creator"/>
          <UserCard type="child" />
          <UserCard type="parent" /> 
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
          <EventCalendarContainer searchParams={searchParams}/>
          <Announcements/>
          <CountryDisplay/>
      </div>
    </div>
  );
};

export default AdminPage;
