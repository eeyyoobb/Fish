"use client";

import { Users, Crown, DollarSign,Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import RoleButton from './RoleButton';
import { useToast } from "@/hooks/use-toast"
import { useUser } from '@clerk/nextjs';
import { Input } from "@/components/ui/input";
import { toast as sonnerToast } from "sonner";


export default function DashboardPage() {
    const { user} = useUser();
    const role = user?.publicMetadata.role as string;

    const { toast } = useToast();
    const [balance, setBalance] = useState(0);
    const [totalChildren, setTotalChildren] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isMonetized, setIsMonetized] = useState(false);
    const [account, setAccount] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [balanceRes, childrenRes, tasksRes] = await Promise.all([
                    fetch('/api/balance'),
                    fetch('/api/children'),
                    fetch('/api/complited')
                ]);

                const balanceData = await balanceRes.json();
                const childrenData = await childrenRes.json();
                const tasksData = await tasksRes.json();

                setBalance(balanceData.balance || 0);
                setIsMonetized(balanceData.monetization || false);
                setTotalChildren(childrenData.count || 0);
                setCompletedTasks(tasksData.count || 0);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load dashboard data. Please try again.",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [toast]);

  

    const isCreatorEligible = balance >= 1000;
    const isParentEligible = totalChildren >= 20 && completedTasks >= 20;
    const isMonetizeEligible = totalChildren >= 5 && completedTasks >= 20;

    const calculateProgress = (current: number, required: number) => {
        return Math.min((current / required) * 100, 100);
    };

    const creatorProgress = calculateProgress(balance, 1000);
    const parentProgress = calculateProgress(totalChildren + completedTasks, 40);
    const monetizeProgress = calculateProgress(totalChildren + completedTasks, 6);
    

    console.log("@",balance)

    const handleRoleUpdate = async (role: string) => {
        try {
            const response = await fetch('/api/role', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role })
            });

            if (!response.ok) throw new Error('Failed to update role');
            
            toast({
                title: "Success",
                description: `Your role has been updated to ${role}`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update role. Please try again.",
            });
        }
    };
    const handleMonetization = async () => {
        try {

          if (!account.trim()) {
            sonnerToast ("Please enter your Binance Wallet Address.");
            return; // Stop the process if the input is empty
        }
            const response = await fetch('/api/monitize', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'monetized' , account: account})
            });
    
            if (!response.ok) throw new Error('Failed to update monetization');
            setIsMonetized(true);
            sonnerToast.success("Your account has been successfully monetized!")
            toast({
                title: "Success",
                description: "Your account has been successfully monetized!",
            });
        } catch (error) {
          sonnerToast.error("Failed to update monetization. Please try again.")
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update monetization. Please try again.",
            });
        }
    };
    

    if (isLoading) {
        return (
            <div className="p-6 max-w-7xl mx-auto mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[200px] bg-gray-800/50 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className=" relative p-6 max-w-7xl mx-auto mb-3">
          <h2 className="text-2xl font-bold relative mb-8">Upgrade Your Role
          <span className="absolute bottom-[-0.6rem] left-0 w-12 h-1 bg-indigo-600 rounded"></span>
          </h2>
          <div className="flex flex-col gap-6">
          
            {role === "child" && (
              <div className="relative group w-full h-40 bg-gray-700 rounded-xl">
               <div 
                    className="absolute inset-0 rounded-xl transition-all duration-300"
                    style={{
                        width: `${creatorProgress}%`,       // Fills the width based on progress
                        background: 'linear-gradient(to right, #a8e063, #56ab2f)',            // Solid green color for progress fill
                        opacity: 0.9,                       // Slight transparency to blend with background
                    }}
                />
                  <RoleButton 
                    title="Become Creator"
                    Icon={Crown}
                    isEligible={isCreatorEligible}
                    requirement={`Need $${1000 - balance} more`}
                    readyMessage="Ready to create!"
                    onClick={() => handleRoleUpdate('creator')}
                  />
                  <div className="absolute bottom-3 right-3 text-sm font-medium text-gray-300">
                    {creatorProgress.toFixed(0)}%
                  </div>
                </div>
            )}
      
            {role !== "parent" && (
              <div className="relative group w-full h-40 bg-gray-700 rounded-xl ">
              <div 
                   className="absolute inset-0 rounded-xl transition-all duration-300"
                   style={{
                       width: `${parentProgress}%`,       // Fills the width based on progress
                       background: 'linear-gradient(to right, #a8e063, #56ab2f)',            // Solid green color for progress fill
                       opacity: 0.9,                       // Slight transparency to blend with background
                   }}
               />
                  <RoleButton
                    title="Apply as Parent"
                    Icon={Users}
                    isEligible={isParentEligible}
                    requirement={`Need ${20 - totalChildren} more children and ${20 - completedTasks} more tasks`}
                    readyMessage="Ready to parent!"
                    onClick={() => handleRoleUpdate('parent')}
                  />
                  <div className="absolute bottom-3 right-3 text-sm font-medium text-gray-300">
                    {parentProgress.toFixed(0)}%
                  </div>
                </div>
            )}
      
      <div className="relative group">
      {isMonetized && (
        <div 
        className="absolute inset-0 rounded-xl transition-all duration-300"
        style={{
            width: `${monetizeProgress}%`,       // Fills the width based on progress
            background: 'linear-gradient(to right, #a8e063, #56ab2f)',            // Solid green color for progress fill
            opacity: 0.9,                       // Slight transparency to blend with background
        }}
    />
      )}
      <div 
        className={` relative group w-full h-40 bg-gray-700 rounded-xl ${
          isMonetized ? "glass text-white border-green-500" : "bg-gray-800/90 text-gray-300 border-gray-700 backdrop-blur-sm"
        }`}
      >
        {isMonetized ? (
         <div className="confirm">
            <span>MONETIZED</span>
            <span className="text-yellow-500">
              <Award className="w-10 h-10" />
            </span>
            </div>
        ) : (
          <>
            <RoleButton
              title="Monetize Account"
              Icon={DollarSign}
              isEligible={isMonetizeEligible}
              requirement={`Need ${1 - totalChildren} more children and ${2 - completedTasks} more tasks`}
              readyMessage="Ready to monetize!"
              onClick={() => setIsInputVisible(true)}
            />
            {isInputVisible && (
              <div className="mt-2">
                <Input
                  type="text"
                  placeholder="Enter your Binance Wallet Address"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full"
                  disabled={!isMonetizeEligible || isMonetized || isLoading}
                />
              </div>
            )}
            <div className="absolute bottom-3 right-3 text-sm font-medium">
              {monetizeProgress.toFixed(0)}%
            </div>
            {isInputVisible && (
              <button
                className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                onClick={handleMonetization}
                disabled={!account.trim() || isLoading}
              >
                Confirm Monetization
              </button>
            )}
          </>
        )}
      </div>
    </div>
   </div>
   </div>
      );
    }