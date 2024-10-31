"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowUpCircle, Copy } from "lucide-react";
import { toast } from "sonner";

interface TopUpSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TopUpSheet({ isOpen, onClose }: TopUpSheetProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const adminAccountNumber = "1234-5678-9012-3456";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(adminAccountNumber);
    toast.success("Account number copied to clipboard");
  };

  const handleTopUpRequest = async () => {
    if (!amount) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/transactions/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process top-up');
      }
      toast.success("Top-up successful");
      onClose();
    } catch (error) {
      toast.error("Error during top-up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ArrowUpCircle className="w-5 h-5" />
            Top Up Funds
          </SheetTitle>
          <SheetDescription>
            Add funds to your MTC wallet
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label>Admin Account Number</Label>
            <div className="relative">
              <Input disabled value={adminAccountNumber} />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={copyToClipboard}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
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
            onClick={handleTopUpRequest}
            disabled={!amount || parseFloat(amount) <= 0 || isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Top Up"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
