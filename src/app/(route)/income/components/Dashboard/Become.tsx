

import Stat from './BecomeStat';
import Role from './BecomeRole';
import { auth } from '@clerk/nextjs/server';


const DashboardPage = async () => {

    const { sessionClaims} = auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;


    
    return (
        <div className="relative w-full bg-gradient-to-br from-brand to-glass rounded-2xl ">
            <div className="container flex flex-col mx-auto p-8 justify-end items-end ">
                <Stat/>
            </div>
            {role !== "parent" && (
            <div className="relative rounded-2xl shadow-sm p-4 border border-gray-100 m-6">
                <Role/>
            </div>
            )}
        </div>
    );
};


export default DashboardPage;
