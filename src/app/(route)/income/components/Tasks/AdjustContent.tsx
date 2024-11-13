"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface AdjustContentProps {
  closeModal: () => void;
}

const AdjustContent = ({ closeModal }: AdjustContentProps) => {
  const [ywatch, setYwatch] = useState<number | undefined>(undefined);
  const [ylike, setYlike] = useState<number | undefined>(undefined);
  const [ysub, setYsub] = useState<number | undefined>(undefined);
  const [join, setJoin] = useState<number | undefined>(undefined);
  const [fee, setFee] = useState<number | undefined>(undefined);
  const [token, setToken] = useState<number | undefined>(undefined);
  const [mtask, setMtask] = useState<number | undefined>(undefined);
  const [mchild, setMchild] = useState<number | undefined>(undefined);
  const [mcreate, setMcreate] = useState<number | undefined>(undefined);
  const [Account, setAccount] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<number | undefined>(undefined);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setter(value ? parseFloat(value) : undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const adjustData = {
      ywatch,
      ylike,
      ysub,
      join,
      fee,
      token,
      mtask,
      mchild,
      mcreate,
      Account,
      balance,
    };

    try {
      const res = await axios.post("/api/adjusts", adjustData);
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Task adjusted successfully.");
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-100">Adjust Task</h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ywatch" className="text-gray-200">YouTube Watch</Label>
            <Input
              id="ywatch"
              type="number"
              value={ywatch ?? ""}
              onChange={handleChange(setYwatch)}
              placeholder="Enter YouTube watch count"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ylike" className="text-gray-200">YouTube Likes</Label>
            <Input
              id="ylike"
              type="number"
              value={ylike ?? ""}
              onChange={handleChange(setYlike)}
              placeholder="Enter YouTube like count"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ysub" className="text-gray-200">YouTube Subscribers</Label>
            <Input
              id="ysub"
              type="number"
              value={ysub ?? ""}
              onChange={handleChange(setYsub)}
              placeholder="Enter YouTube subscriber count"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="join" className="text-gray-200">Join Count</Label>
            <Input
              id="join"
              type="number"
              value={join ?? ""}
              onChange={handleChange(setJoin)}
              placeholder="Enter join count"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee" className="text-gray-200">Fee</Label>
            <Input
              id="fee"
              type="number"
              value={fee ?? ""}
              onChange={handleChange(setFee)}
              placeholder="Enter fee"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token" className="text-gray-200">Token</Label>
            <Input
              id="token"
              type="number"
              value={token ?? ""}
              onChange={handleChange(setToken)}
              placeholder="Enter token amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mtask" className="text-gray-200">Monthly Tasks</Label>
            <Input
              id="mtask"
              type="number"
              value={mtask ?? ""}
              onChange={handleChange(setMtask)}
              placeholder="Enter monthly tasks"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mchild" className="text-gray-200">Monthly Child Tasks</Label>
            <Input
              id="mchild"
              type="number"
              value={mchild ?? ""}
              onChange={handleChange(setMchild)}
              placeholder="Enter monthly child tasks"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mcreate" className="text-gray-200">Monthly Created Tasks</Label>
            <Input
              id="mcreate"
              type="number"
              value={mcreate ?? ""}
              onChange={handleChange(setMcreate)}
              placeholder="Enter monthly created tasks"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Account" className="text-gray-200">Account</Label>
            <Input
              id="Account"
              type="text"
              value={Account ?? ""}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="Enter account information"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance" className="text-gray-200">Balance</Label>
            <Input
              id="balance"
              type="number"
              value={balance ?? ""}
              onChange={handleChange(setBalance)}
              placeholder="Enter balance"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Adjust Task
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 -z-10" onClick={closeModal} />
    </form>
  );
};

export default AdjustContent;
