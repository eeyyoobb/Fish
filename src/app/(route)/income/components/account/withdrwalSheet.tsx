"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowDownCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

interface WithdrawSheetProps {
  isOpen: boolean;
  onClose: () => void;
  userAccountNumber: string;
}

export function WithdrawSheet({ isOpen, onClose, userAccountNumber }: WithdrawSheetProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();

  const handleWithdraw = async () => {
    setIsLoading(true);
    try {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Please enter a valid withdrawal amount.");
      }

      const response = await axios.post('/api/transactions/withdraw', { amount: parsedAmount });

      if (response.status !== 200) {
        throw new Error(response.data?.error || "Failed to process withdrawal.");
      }

      toast.success("Withdrawal successful!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "An error occurred during withdrawal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ArrowDownCircle className="w-5 h-5" />
            Withdraw Funds
          </SheetTitle>
          <SheetDescription>Withdraw MTC to your registered account</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label>Your Account Number</Label>
            <Input disabled value={userAccountNumber} />
          </div>
          <div className="space-y-2">
            <Label>Amount (MTC)</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button 
            className="w-full"
            onClick={handleWithdraw}
            disabled={!amount || parseFloat(amount) <= 0 || isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Withdrawal"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}