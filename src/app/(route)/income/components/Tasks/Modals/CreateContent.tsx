"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { add } from "@/utils/Icons";
import { toast } from "sonner";
import Button from "../Button/Button";

interface CreateContentProps {
  closeModal: () => void;
}

interface Category {
  id: string;  // Adjust the type if necessary
  name: string;
}

function CreateContent({ closeModal }: CreateContentProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState(""); 
  const [startTime, setStartTime] = useState(""); 
  const [endTime, setEndTime] = useState(""); 
  const [categoryId, setCategoryId] = useState(""); 
  const [creatorId] = useState(""); 
  const [link, setLink] = useState(""); 
  const [reward, setReward] = useState(0); 
  const [code, setCode] = useState(""); 
  const [threshold, setThreshold] = useState(0); 
  const [duration, setDuration] = useState(""); // New field for video duration
  const [ads, setAds] = useState(0); // New field for number of ads
  const [categories, setCategories] = useState<Category[]>([]); 

  // Fetch categories from the API when the component mounts
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

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "day":
        setDay(e.target.value);
        break;
      case "startTime":
        setStartTime(e.target.value);
        break;
      case "endTime":
        setEndTime(e.target.value);
        break;
      case "categoryId":
        setCategoryId(e.target.value);
        break;
      case "link":
        setLink(e.target.value);
        break;
      case "reward":
        setReward(Number(e.target.value));
        break;
      case "code":
        setCode(e.target.value);
        break;
      case "threshold":
        setThreshold(Number(e.target.value));
        break;
      case "duration":
        setDuration(e.target.value);
        break;
      case "ads":
        setAds(Number(e.target.value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      day,
      startTime,
      endTime,
      categoryId,
      creatorId,
      link,
      reward,
      code,
      threshold,
      duration, // Include duration if applicable
      ads, // Include ads if applicable
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

  return (
    <form onSubmit={handleSubmit} className="text-gray-300">
      <h1 className="text-xl font-semibold mb-4">Create a Task</h1>

      <div className="mb-4">
        <label htmlFor="categoryName" className="block mb-2 font-medium">
          Category
        </label>
        <select
          id="categoryId"
          value={categoryId}
          onChange={handleChange("categoryId")}
          className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Conditionally render fields based on selected category */}
      {categoryId === "youtube" && ( // Replace "youtube" with the actual ID for YouTube category
        <>
          <div className="mb-4">
            <label htmlFor="duration" className="block mb-2 font-medium">
              Video Duration
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={handleChange("duration")}
              placeholder="e.g., 10:30"
              className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ads" className="block mb-2 font-medium">
              Number of Ads
            </label>
            <input
              type="number"
              id="ads"
              value={ads}
              onChange={handleChange("ads")}
              placeholder="Number of ads"
              className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={categoryId}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g., Watch a video from Fireship."
          className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-medium">
          Description
        </label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="e.g., Watch a video about Next.js Auth"
          className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="link" className="block mb-2 font-medium">
          Link
        </label>
        <input
          type="url"
          id="link"
          value={link}
          onChange={handleChange("link")}
          placeholder="e.g., https://example.com"
          className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="reward" className="block mb-2 font-medium">
          Reward
        </label>
        <input
          type="number"
          id="reward"
          value={reward}
          onChange={handleChange("reward")}
          placeholder="Reward amount"
          className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="code" className="block mb-2 font-medium">
          Code
        </label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={handleChange("code")}
          placeholder="Enter code"
          className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="threshold" className="block mb-2 font-medium">
          Threshold
        </label>
        <input
          type="number"
          id="threshold"
          value={threshold}
          onChange={handleChange("threshold")}
          placeholder="Threshold value"
          className="w-full p-3 bg-gray-900 text-gray-200 rounded-md"
        />
      </div>
      <div className="flex justify-end px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-green-600">
        <Button icon={add} name="Create Task" />
      </div>
    </form>
  );
}

export default CreateContent;
