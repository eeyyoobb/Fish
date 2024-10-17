"use client"

const GenerateLinkButton = ({ referralId }: { referralId: string }) => {
  
  const linkToCopy = `/income/registration?referral=${referralId}`;

   
  const handleClick = async () => {
    try {
      const fullLink = window.location.origin + linkToCopy;
      await navigator.clipboard.writeText(fullLink);
      alert("Link copied to clipboard!");
    } catch (err) {
      // Log any errors
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
