// components/GenerateLinkButton.tsx
"use client"; // If you are using React 18 with Next.js

const GenerateLinkButton = ({ referralId }: { referralId: string }) => {
  const linkToCopy = `/income/registration?referral=${referralId}`; // Add the referral ID to the link

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + linkToCopy);
      alert("Link copied to clipboard!"); // Notify the user
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white py-2 px-4 rounded"
    >
      Copy Registration Link
    </button>
  );
};

export default GenerateLinkButton;
