"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface CreateContentProps {
  closeModal: () => void;
}

interface Category {
  id: string;
  name: string;
}

function CreateContent({ closeModal }: CreateContentProps) {
  const [description, setDescription] = useState("");
  const [ad1, setAd1] = useState("");
  const [ad2, setAd2] = useState("");
  const [ad3, setAd3] = useState("");
  const [track, setTrack] = useState("");
  const [trackmin, setTrackmin] = useState("");
  const [track2, setTrack2] = useState("");
  const [trackmin2, setTrackmin2] = useState("");
  const [isUnderstand, setIsUnderstand] = useState(false);
  const [link, setLink] = useState("");
  const [reward, setReward] = useState(0);
  const [duration, setDuration] = useState(0);
  const [threshold, setThreshold] = useState(10);
  const [categoryId, setCategoryId] = useState("");
  const [ownerId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const category = categories.find(category => category.id === categoryId)?.name;
    if (category === "youtube") {
      // For YouTube: duration * 1.5 * threshold
      const calculatedReward = Math.round(duration * 1.5 * threshold);
      setReward(calculatedReward);
    } else if (category) {
      // For non-YouTube: threshold * 1.5
      const calculatedReward = Math.round(threshold * 1.5);
      setReward(calculatedReward);
    }
  }, [duration, threshold, categoryId, categories]);
  

  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    switch (name) {
      case "description":
        setDescription(value);
        break;
      case "ad1":
        setAd1(value);
        break;
      case "ad2":
        setAd2(value);
        break;
      case "ad3":
        setAd3(value);
        break;
      case "track":
        setTrack(value);
        break;
      case "trackmin":
        setTrackmin(value);
        break;
      case "track2":
        setTrack2(value);
        break;
      case "trackmin2":
        setTrackmin2(value);
        break;
      case "link":
        setLink(value);
        break;
      case "duration":
        setDuration(Number(value));
        break;
      case "threshold":
        setThreshold(Math.max(10, Number(value)));
        break;
      case "categoryId":
        setCategoryId(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const task = {
      description,
      ad1,
      ad2,
      ad3,
      track,
      trackmin,
      track2,
      trackmin2,
      isUnderstand,
      link,
      reward,
      duration,
      threshold,
      categoryId,
      ownerId,
      completionCount: 0,
      isCompleted: false,
    };

    try {
      const res = await axios.post("/api/tasks", task);
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Task created successfully.");
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const isYouTubeCategory = categories.find(category => category.id === categoryId)?.name === "youtube";

  return (
    <form onSubmit={handleSubmit} className="realtive inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-100 ">Create a Task</h1>

        <div className="space-y-4 ">
          <div className="space-y-2 ">
            <Label htmlFor="category" className="text-gray-200 ">Category</Label>
            <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-200">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={handleChange("description")}
              className="min-h-[100px] glass"
              required
            />
          </div>

          {isYouTubeCategory && (
            <>
              <div className="space-y-2">
                <Label htmlFor="ad1" className="text-gray-200">First Ad Minute</Label>
                <Input
                  id="ad1"
                  type="text"
                  value={ad1}
                  onChange={handleChange("ad1")}
                  placeholder="e.g., 02"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad2" className="text-gray-200">Second Ad Minute</Label>
                <Input
                  id="ad2"
                  type="text"
                  value={ad2}
                  onChange={handleChange("ad2")}
                  placeholder="e.g., 02"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad3" className="text-gray-200">Third Ad Minute</Label>
                <Input
                  id="ad3"
                  type="text"
                  value={ad3}
                  onChange={handleChange("ad3")}
                  placeholder="e.g., 02"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="track" className="text-gray-200">Special Image 1</Label>
                <Input
                  id="track"
                  type="text"
                  value={track}
                  onChange={handleChange("track")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trackmin" className="text-gray-200">Special Image 1 Minute</Label>
                <Input
                  id="trackmin"
                  type="text"
                  value={trackmin}
                  onChange={handleChange("trackmin")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="track2" className="text-gray-200">Special Image 2</Label>
                <Input
                  id="track2"
                  type="text"
                  value={track2}
                  onChange={handleChange("track2")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trackmin2" className="text-gray-200">Special Image 2 Minute</Label>
                <Input
                  id="trackmin2"
                  type="text"
                  value={trackmin2}
                  onChange={handleChange("trackmin2")}
                />
              </div>
              <div className="space-y-2">
            <Label htmlFor="duration" className="text-gray-200">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={handleChange("duration")}
              min="2"
              required
            />
          </div>
            </>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="understand"
              checked={isUnderstand}
              onCheckedChange={(checked) => setIsUnderstand(checked as boolean)}
            />
            <Label htmlFor="understand" className="text-gray-200">Understands Task</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link" className="text-gray-200">Link</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={handleChange("link")}
              required
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="threshold" className="text-gray-200">Threshold</Label>
            <Input
              id="threshold"
              type="number"
              value={threshold}
              onChange={handleChange("threshold")}
              min="10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reward" className="text-gray-200">Payment/BTB</Label>
            <Input
              id="reward"
              type="number"
              value={reward}
              disabled
              className="bg-gray-700 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Create Task
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 -z-10" onClick={closeModal} />
    </form>
  );
}

export default CreateContent;