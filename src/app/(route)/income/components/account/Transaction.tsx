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
    <div className="realtive bg-background p-6">
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
            <div className="text-4xl font-bold">
            <h1>Wallet Balance: ${formattedBalance}</h1>
            </div>
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
      </div>

      {/* Transaction Sheets */}
       <WithdrawSheet
        isOpen={activeSheet === "withdraw"}
        onClose={() => setActiveSheet(null)}
        userAccountNumber={Account}
      />
      <TransferSheet
        isOpen={activeSheet === "transfer"}
        onClose={() => setActiveSheet(null)}
      />
      <TopUpSheet
        isOpen={activeSheet === "topup"}
        onClose={() => setActiveSheet(null)}
      />
    </div>
  );
}