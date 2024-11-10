import Announcements from "../components/Dashboard/Announcements";
import Become from "../components/Dashboard/Become";
import EventCalendarContainer from "../components/Dashboard/EventCalendarContainer";
import FinanceChart from "../components/Market/FinanceChart";
import { CountryDisplay } from '@/components/flag';


const ChildPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {


  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full  p-4 rounded-md">
          <div className="flex gap-4 justify-between flex-wrap">
            <Become/>
        </div>
        {/* <div className="flex gap-4 flex-col lg:flex-row mt-3">
          <div className="w-full lg-w-full h-[500px] mt-3">
            <FinanceChart/>
          </div>
        </div> */}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col mt-3 gap-3">
      <EventCalendarContainer searchParams={searchParams}/>
      <Announcements />
      <CountryDisplay />
      </div>
    </div>
  );
};

export default ChildPage;
