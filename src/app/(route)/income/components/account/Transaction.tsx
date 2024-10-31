"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, Wallet, ArrowRightLeft, Plus, MinusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WithdrawSheet } from "./withdrwalSheet";
import { TransferSheet } from "./transferSheet";
import { TopUpSheet } from "./topUpSheet";
import { useState } from "react";

export default function TransactionPage() {
  const [activeSheet, setActiveSheet] = useState<"withdraw" | "transfer" | "topup" | null>(null);
  
  // Mock user data - replace with actual user data from your auth system
  const mockUserId = "user123";
  const userAccountNumber = "9876-5432-1098-7654";

  const transactions = [
    {
      id: 1,
      type: "Withdrawal",
      amount: -500,
      status: "completed",
      date: "2024-03-20",
      description: "ATM Withdrawal"
    },
    {
      id: 2,
      type: "Top Up",
      amount: 1000,
      status: "completed",
      date: "2024-03-19",
      description: "Bank Transfer"
    },
    {
      id: 3,
      type: "Transfer",
      amount: -250,
      status: "pending",
      date: "2024-03-18",
      description: "To John Doe"
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-none shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1,234.56 MTC</div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => setActiveSheet("topup")}
          >
            <ArrowUpCircle className="w-6 h-6" />
            <span>Top Up</span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => setActiveSheet("withdraw")}
          >
            <ArrowDownCircle className="w-6 h-6" />
            <span>Withdraw</span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => setActiveSheet("transfer")}
          >
            <ArrowRightLeft className="w-6 h-6" />
            <span>Transfer</span>
          </Button>
        </div>

        {/* Transaction History */}
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
                          {transaction.amount > 0 ? (
                            <Plus className="w-8 h-8 text-green-500" />
                          ) : (
                            <MinusCircle className="w-8 h-8 text-red-500" />
                          )}
                          <div>
                            <div className="font-semibold">{transaction.type}</div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.description}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${
                            transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} MTC
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
                      .filter(t => t.amount > 0)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Plus className="w-8 h-8 text-green-500" />
                            <div>
                              <div className="font-semibold">{transaction.type}</div>
                              <div className="text-sm text-muted-foreground">
                                {transaction.description}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-500">
                              +{transaction.amount} MTC
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

      {/* Transaction Sheets */}
      <WithdrawSheet
        isOpen={activeSheet === "withdraw"}
        onClose={() => setActiveSheet(null)}
        userAccountNumber={userAccountNumber}
        userId={mockUserId}
      />
      <TransferSheet
        isOpen={activeSheet === "transfer"}
        onClose={() => setActiveSheet(null)}
        userId={mockUserId}
      />
      <TopUpSheet
        isOpen={activeSheet === "topup"}
        onClose={() => setActiveSheet(null)}
        userId={mockUserId}
      />
    </div>
  );
}