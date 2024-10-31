"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

interface TransferSheetProps {
  isOpen: boolean;
  onClose: () => void;

}

export function TransferSheet({ isOpen, onClose}: TransferSheetProps) {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const serviceFee = amount ? parseFloat(amount) * 0.05 : 0; // Calculate only if amount is valid
  const totalAmount = amount ? parseFloat(amount) + serviceFee : 0;

  const handleTransfer = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/transactions/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toUsername: username, amount: parseFloat(amount) }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to process transfer");
      }

      toast.success("Transfer successful");
      setUsername("");
      setAmount("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Transfer Funds
          </SheetTitle>
          <SheetDescription>Transfer MTC to another user</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label>Recipient Username</Label>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
          {amount && (
            <div className="text-sm text-muted-foreground">
              Service Fee (5%): {serviceFee.toFixed(2)} MTC
              <br />
              Total Amount: {totalAmount.toFixed(2)} MTC
            </div>
          )}
          <Button
            className="w-full"
            onClick={handleTransfer}
            disabled={!username || !amount || parseFloat(amount) <= 0 || isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Transfer"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
