
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { FaWallet } from 'react-icons/fa'; // Importing an icon


const Wallet = async () => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  let wallet = null; 
  let balance = null;
  let transactions = null;
  let withdraw = null;

  if (role) {
    //@ts-ignore
    const userData = await prisma[role].findFirst({
    });
    wallet = userData?.wallet || 0;
    balance = userData?.balance || 0;
    withdraw = userData?.withdraw || 0;
  }

  return (
    <div className="glass p-6 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">ACCOUNT</h1>
      </div>
      <h1 className="text-xl font-semibold mt-4">Total Balance</h1>
      <div className="flex items-center space-x-2  ">
      <div className="container flex items-center justify-start p-4 rounded-lg shadow-lg glass ">
            <div id="coin" className="mr-2"> {/* Reduced right margin for less space */}
                <div className="heads" />
                <div className="tails" />
            </div>
            <span className="text-xl font-bold text-brand flex items-center mt-5"> {/* Ensure text is centered vertically */}
                <FaWallet className="ml-2" /> {/* Wallet Icon */}
                {wallet} MTC
            </span>
        </div>
        
      </div>

      {/* Approved Transactions */}
     <div className="mt-4 flex items-center space-x-2 glass p-3 rounded-md ">
     <i className="fa-solid fa-wallet"></i>
        <span className="font-semibold text-emerald-600">Approved: {balance} MTC</span>
      </div>

      {/* Pending Transactions */}
      <div className="mt-2 flex items-center space-x-2 glass p-3 rounded-md">
      <i className="fa-solid fa-sack-dollar"></i>
        <span className="font-semibold text-yellow-600">Pending: {wallet}MTC</span>
      </div>

      <div className="mt-2 flex items-center space-x-2 glass p-3 rounded-md">
      <i className="fa-solid fa-sack-dollar"></i>
        <span className="font-semibold text-indigo-300">Withdrawal: {withdraw}MTC</span>
      </div>

    </div>
  );
};

export default Wallet;


