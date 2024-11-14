"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdjustContentProps {
  closeModal: () => void;
  initialData?: Partial<AdjustData>;
}

interface AdjustData {
  ywatch?: number;
  ylike?: number;
  ysub?: number;
  join?: number;
  fee?: number;
  token?: number;
  mtask?: number;
  mchild?: number;
  mcreate?: number;
  Account?: string;
  balance?: number;
  wallet?: number;
}

const AdjustContent = ({ closeModal, initialData = {} }: AdjustContentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState<AdjustData>(initialData);

  const id = "6735bdb18d3506112211fd45"; // You can later replace with dynamic ID
  useEffect(() => {
    axios
      .get(`/api/adjusts/${id}`)
      .then((res) => setValues((prevValues) => ({ ...prevValues, ...res.data })))
      .catch((err) => console.log(err));
  }, [id]);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`/api/adjusts/${id}`, values);
      router.push('/income');
      toast.success("Task updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { id: "ywatch", label: "YouTube Watch", type: "number" },
    { id: "ylike", label: "YouTube Likes", type: "number" },
    { id: "ysub", label: "YouTube Subscribers", type: "number" },
    { id: "join", label: "Join Count", type: "number" },
    { id: "fee", label: "Fee", type: "number" },
    { id: "token", label: "Token", type: "number" },
    { id: "mtask", label: "Monetization Tasks", type: "number" },
    { id: "mchild", label: "Monetization Child Tasks", type: "number" },
    { id: "mcreate", label: "Monetization Created Tasks", type: "number" },
    { id: "Account", label: "Account", type: "text" },
    { id: "balance", label: "Balance", type: "number" },
    { id: "wallet", label: "Wallet", type: "number" },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={closeModal} />
      <div className="relative bg-background p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Adjust Task</h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map(({ id, label, type }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id} className="text-sm font-medium">
                  {label}
                </Label>
                <Input
                  id={id}
                  type={type}
                  value={values[id as keyof AdjustData]}
                  onChange={(e) =>
                    setValues((prevValues) => ({
                      ...prevValues,
                      [id]: type === "number" ? Number(e.target.value) : e.target.value,
                    }))
                  }
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={cn("w-full", type === "number" && "appearance-none")}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "Updating..." : "Update Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdjustContent;
