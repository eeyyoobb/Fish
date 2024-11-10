"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, Wallet, ArrowRightLeft, Plus, MinusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WithdrawSheet } from "./withdrwalSheet";
import { TransferSheet } from "./transferSheet";
import { TopUpSheet } from "./topUpSheet";
import { useState, useEffect } from "react";

type Transaction = {
  id: string;
  amount: number;
  type: string;
  status: string;
  date: string;
  description?: string;
};

type Wallet = {
  balance: number;
  account:string;
};

  
export default function TransactionPage() {
  const [activeSheet, setActiveSheet] = useState<"withdraw" | "transfer" | "topup" | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [account, setAccount] = useState<Wallet | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    async function fetchWallet() {
      try {
        const response = await fetch("/api/wallet"); // Ensure this URL is correct
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("hjk",data)
        setWallet(data);
      } catch (error) {
        console.error("Failed to fetch wallet:", error);
      }
    }
  
    fetchWallet();
  }, []);
  
  // Format balance with 2 decimal places
  const formattedBalance = wallet?.balance?.toFixed(2) || "0.00";
  const Account = wallet?.account || "";
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="incoming">Incoming</TabsTrigger>
                <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <ScrollArea className="h-[400px] w-full pr-4">
                <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon for transaction amount */}
                          {transaction.amount > 0 ? (
                            <Plus className="w-8 h-8 text-green-500" />
                          ) : (
                            <MinusCircle className="w-8 h-8 text-red-500" />
                          )}
                          
                          <div>
                            {/* Type with conditional color */}
                            <div className={`font-semibold ${
                              transaction.type === "WITHDRAWAL" ? "text-red-500" :
                              transaction.type === "TOPUP" ? "text-green-500" :
                              "text-orange-500"
                            }`}>
                              {transaction.type}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.description}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          {/* Amount with conditional color */}
                          <div className={`font-bold ${
                            transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} MTC
                          </div>

                          <div className={`text-sm font-semibold ${
                            transaction.status === "PENDING" ? "text-yellow-500" :
                            transaction.status === "COMPLETED" ? "text-green-500" :
                            "text-red-500"
                          }`}>
                            {transaction.status}
                          </div>

                          <div className="text-sm text-muted-foreground">
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="incoming">
                <ScrollArea className="h-[400px] w-full pr-4">
                <div className="space-y-4">
                  {transactions
                    .filter(t => t.amount > 0 &&  t.status === "COMPLETED" )
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Plus className="w-8 h-8 text-green-500" />
                          
                          <div>
                            {/* Transaction Type with conditional color */}
                            <div className={`font-semibold ${
                              transaction.type === "WITHDRAWAL" ? "text-red-500" :
                              transaction.type === "TOPUP" ? "text-green-500" :
                              "text-orange-500"
                            }`}>
                              {transaction.type}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.description}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          {/* Amount */}
                          <div className="font-bold text-green-500">
                            +{transaction.amount} MTC
                          </div>
                          
                          {/* Transaction Status with conditional color */}
                          <div className={`text-sm font-semibold ${
                            transaction.status === "PENDING" ? "text-yellow-500" :
                            transaction.status === "COMPLETED" ? "text-green-500" :
                            "text-red-500"
                          }`}>
                            {transaction.status}
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="outgoing">
                <ScrollArea className="h-[400px] w-full pr-4">
                  <div className="space-y-4">
                    {transactions
                      .filter(t => t.amount < 0)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <MinusCircle className="w-8 h-8 text-red-500" />
                            <div>
                              <div className="font-semibold">{transaction.type}</div>
                              <div className="text-sm text-muted-foreground">
                                {transaction.description}
                              </div> 
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-red-500">
                              {transaction.amount} MTC
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.date}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}