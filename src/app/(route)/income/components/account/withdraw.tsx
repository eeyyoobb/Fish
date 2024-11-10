
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Wallet } from 'lucide-react';


const MyWallet = async () => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  let wallet = null; 
  let balance = null;
  let transactions = null;
  let withdraw = null;
  let tribeId ="";
  let tribeWallet = null;
  let tribeBalance = null;
  let tribeWithdraw  = null;

  if (role) {
    //@ts-ignore
    const userData = await prisma[role].findFirst({
      where : {clerkId:userId},
      select: {
        tribeId: true,
        wallet: true,
        balance: true,
      },
    }
  );
    
   wallet = userData?.wallet || 0;
   balance = userData?.balance || 0;
   withdraw = userData?.withdraw || 0;
   tribeId =userData?.tribeId;

  if (tribeId) {
    //@ts-ignore
    const tribeData = await prisma[role].aggregate({
      where: { tribeId },
      _sum: {
        wallet: true,
        balance: true,
      },
    });
    tribeWallet = tribeData._sum.wallet || 0;
    tribeBalance = tribeData._sum.balance || 0;
    tribeWithdraw = tribeData._sum.withdraw || 0;
  }
}

  return (
    <div className="glass w-full p-6 rounded-md shadow-md">
      <div className="flex items-center justify-end">
        <h1 className="text-xl font-semibold">ACCOUNT</h1>
      </div>
      <h1 className="text-xl font-semibold mt-4">Total Balance</h1>
      <div className="flex items-center space-x-2  ">
      <div className="container flex items-center justify-start p-4 rounded-lg shadow-lg glass ">
            <div id="coin" className="mr-2">
                <div className="heads" />
                <div className="tails" />
            </div>
            <span className="text-xl font-bold text-brand flex items-center mt-5"> 
                <Wallet className="ml-2" /> 
                {wallet + balance} MTC
            </span>
        </div>
        
      </div>

      {/* Approved Transactions */}
     <div className="mt-4 flex items-center space-x-2 glass p-4 rounded-md ">
       <i className="fa-solid fa-wallet "></i>
        <span className="font-semibold text-emerald-600 ">Approved: {balance} MTC</span>
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

      <div className="mt-2 flex items-center space-x-3 glass p-3 rounded-md">
      <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-sack-dollar text-brand"></i>
              <span className="font-semibold text-indigo-300">Tribe:</span>
            </div>
            <span className="font-semibold text-indigo-300">{tribeWallet} MTC</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-indigo-300">Tribe Balance:</span>
            <span className="font-semibold text-indigo-300 ">{tribeBalance} MTC</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyWallet;


