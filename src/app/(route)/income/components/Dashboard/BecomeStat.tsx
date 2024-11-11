
import { Wallet, Users, Crown, User,Award} from 'lucide-react';
import StatCard from './StatCard';
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { clerkClient } from '@clerk/express';


const StatPage = async () => {
    const { userId, sessionClaims } = auth();

    const fetchBalance = async () => {
        const role = (sessionClaims?.metadata as { role?: string })?.role;
        //@ts-ignore

        const userRecord = await prisma[role].findUnique({
            where: { clerkId: userId },
            select: { balance: true},
        });
        return userRecord?.balance ?? "No balance found";
    };

    const fetchStat = async () => {
        const role = (sessionClaims?.metadata as { role?: string })?.role;
        //@ts-ignore
        const userRecord = await prisma[role].findUnique({
            where: { clerkId: userId },
            select: { monetization: true},
        });
        return userRecord?.monetization ? "Monetized" : "Not Monetized";
    };

    const fetchTotalChildren = async () => {
        //@ts-ignore
        const childCount = await prisma.child.count({
            where: {
                fatherId: userId,
            },
        });
        const creatorCount = await prisma.creator.count({
            where: {
              fatherId: userId,
            },
          });
      
          // Fetch parent count based on `fatherId`
          const parentCount = await prisma.parent.count({
            where: {
              fatherId: userId,
            },
          });
          
          const totalChildrenCount = childCount + creatorCount + parentCount;

          return totalChildrenCount;
    };

    const fetchCompletedTasks = async () => {
        if (!userId) {
            console.warn("No user ID found. Please ensure the user is authenticated.");
            return 0;
        }
        return await prisma.taskCompletion.count({
            where: {
                userId: userId,
                isCompleted: true,
            },
        });
    };

    const fetchParents = async () => {

        const role = (sessionClaims?.metadata as { role?: string })?.role;

        if (!userId) {
            console.warn("No user ID found. Please ensure the user is authenticated.");
            return "No parent or tribe found";
        }
    
        //@ts-ignore
        const childRecord = await prisma[role].findUnique({
            where: {
                clerkId: userId,
            },
            select: {
                fatherId: true,
                tribeId: true,
            },
        });
    
        if (!childRecord) {
            console.warn("No child record found for this user.");
            return "No parent or tribe found";
        }
    
        const { fatherId, tribeId} = childRecord;
        // Fetch father details from Clerk if fatherId exists
        let fatherName = "No father found";

        // Check if fatherId is available and valid
        if (fatherId) {
            try {
                // Fetch father details from Clerk API
                const fatherUser = await clerkClient.users.getUser(fatherId);
                
                // If the user is found, use the username, otherwise fallback to default
                fatherName = fatherUser?.username ?? "No father found";
            } catch (error) {
                // Log the error with additional context
                console.error("Error fetching father details for ID:", fatherId, error);
                
                // You might want to return or set a different value based on error
                fatherName = "Error fetching father details";
            }
        } else {
            console.error("No valid fatherId provided");
        }
    
        let tribeName = "No tribe found";

        if (tribeId) {
            const tribeRecord = await prisma.tribe.findUnique({
                where: { id: tribeId },
                select: { name: true },
            });
            tribeName = tribeRecord?.name ?? "No tribe found";
        }
    
        return `${fatherName},${tribeName}`;

    };
    

    return (
        <>
                <div className="mb-8 w-full">
                    <h1 className="text-2xl font-bold relative mb-8">
                        Analytics
                        <span className="absolute bottom-[-0.6rem] left-0 w-12 h-1 bg-indigo-600 rounded"></span>
                    </h1>
                    
                    <div className="flex flex-col flex-grow gap-6">
                        <StatCard title="Current Balance" Icon={Wallet} prefix="$" fetchData={fetchBalance} />
                        <StatCard title="Total Children" Icon={Users} fetchData={fetchTotalChildren} />
                        <StatCard title="Completed Tasks" Icon={Crown} fetchData={fetchCompletedTasks} />
                        <StatCard title="Parent" Icon={User} fetchData={fetchParents} />
                        <StatCard title="Monitization" Icon={Award} fetchData={fetchStat} />
                    </div>
                </div>
            </>
    );
};


export default StatPage;
