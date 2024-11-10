import Announcements from "../components/Dashboard/Announcements";
import { auth } from "@clerk/nextjs/server";
import Become from "../components/Dashboard/Become";

const CreatorPage = () => {
   const { userId } = auth();
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
       <Become/>
        {/* <div className="h-full glass p-4 rounded-md">
         
        </div> */}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default CreatorPage;
