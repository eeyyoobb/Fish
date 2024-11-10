
import Transaction from "../components/account/Transaction";
import TransactionHistory from "../components/account/TransactionHistory";
import FinanceChart from '../components/Market/FinanceChart';


const AccountPage = async () => {


  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full  p-4 rounded-md">
        <h1 className="text-2xl font-bold relative mb-8">
         Account
        <span className="absolute bottom-[-0.6rem] left-0 w-12 h-1 bg-brand rounded"></span>
        </h1>
        <div className="flex flex-col gap-4">
        <Transaction/>
        <FinanceChart/>
        </div>
        </div>
       </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
      <TransactionHistory/>
      </div>
    </div>
  );
};

export default AccountPage;
