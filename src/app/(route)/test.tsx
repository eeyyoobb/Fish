"use client";

import { Users, Crown, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import RoleButton from './RoleButton';
import { useToast } from "@/hooks/use-toast"
import { useUser } from '@clerk/nextjs';


export default function DashboardPage() {
    const { user} = useUser();
    const role = user?.publicMetadata.role as string;

    const { toast } = useToast();
    const [balance, setBalance] = useState(0);
    const [totalChildren, setTotalChildren] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isMonetized, setIsMonetized] = useState(false);

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

    console.log(balance, totalChildren, completedTasks);

    const isCreatorEligible = balance >= 1000;
    const isParentEligible = totalChildren >= 20 && completedTasks >= 20;
    const isMonetizeEligible = totalChildren >= 5 && completedTasks >= 20;

    const calculateProgress = (current: number, required: number) => {
        return Math.min((current / required) * 100, 100);
    };
    
    const getProgressColor = (percentage: number) => {
        if (percentage <= 33) return 'from-red-500 to-orange-500';
        if (percentage <= 66) return 'from-orange-500 to-yellow-500';
        return 'from-green-400 to-green-600';
    };

    const creatorProgress = calculateProgress(balance, 1000);
    const parentProgress = calculateProgress(totalChildren + completedTasks, 40);
    const monetizeProgress = calculateProgress(totalChildren + completedTasks, 7);

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
            const response = await fetch('/api/monitize', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'monetized' })
            });
    
            if (!response.ok) throw new Error('Failed to update monetization');
            setIsMonetized(true);
            toast({
                title: "Success",
                description: "Your account has been successfully monetized!",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update monetization. Please try again.",
            });
        }
    };
    

    if (isLoading) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[200px] bg-gray-800/50 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Upgrade Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {role === "child" && (
              <div className="relative group ">
                <div 
                    className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${getProgressColor(creatorProgress)}`} 
                    style={{ width: `${creatorProgress}%`, opacity: 0.2 }}
                />
                <div className="relative bg-gray-800/90 rounded-xl p-6 backdrop-blur-sm border border-gray-700 hover:scale-105 blockAnime">
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
              </div>
            )}
      
            {role !== "parent" && (
              <div className="relative group">
                <div 
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getProgressColor(parentProgress)} opacity-25 transition-opacity duration-300`}
                  style={{ width: `${parentProgress}%`, minHeight: "100%", borderRadius: "inherit" }} 
                />
                <div className="relative bg-gray-800/90 rounded-xl p-6 backdrop-blur-sm border border-gray-700 hover:scale-105 blockAnime">
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
              </div>
            )}
      
            <div className="relative group">
              {isMonetized && (
                <div 
                  className="absolute inset-0 rounded-xl bg-green-600 opacity-25 hover:scale-105 blockAnime"
                  style={{ width: '100%', minHeight: "100%", borderRadius: "inherit" }} 
                />
              )}
              <div 
                className={`relative rounded-xl p-6 border hover:scale-105 blockAnime ${
                  isMonetized ? "bg-green-600 text-white border-green-500" : "bg-gray-800/90 text-gray-300 border-gray-700 backdrop-blur-sm"
                }`}
              >
                {isMonetized ? (
                  <div className="text-center text-xl font-bold hover:scale-105">MONETIZED</div>
                ) : (
                  <>
                    <RoleButton
                      title="Monetize Account"
                      Icon={DollarSign}
                      isEligible={isMonetizeEligible}
                      requirement={`Need ${5 - totalChildren} more children and ${2 - completedTasks} more tasks`}
                      readyMessage="Ready to monetize!"
                      onClick={() => handleMonetization()}
                    />
                    <div className="absolute bottom-3 right-3 text-sm font-medium">
                      {monetizeProgress.toFixed(0)}%
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }