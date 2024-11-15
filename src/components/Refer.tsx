"use client"

import { toast } from "sonner";
import { Avatar } from "./Icons";

const GenerateLinkButton = ({ referralId }: { referralId: string }) => {
  
  const linkToCopy = `/income/registration?referral=${referralId}`;

   
  const handleClick = async () => {
    try {
      const fullLink = window.location.origin + linkToCopy;
      await navigator.clipboard.writeText(fullLink);
      toast("Link copied to clipboard!");
    } catch (err) {
      // Log any errors
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-full py-2 rounded-lg  md-border border-gray-600  hover:bg-gray-600 hover:text-white transition duration-300500 text-white  px-4 "
    >
      Invite friend <Avatar/>
    </button>
  );
};

export default GenerateLinkButton;
