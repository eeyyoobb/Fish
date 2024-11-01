"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "sonner"; 
import Flag from "react-world-flags"; // Import Flag component

const CountryPage = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null); // State for the country code
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchCountry = async () => {
      try {
        const response = await fetch("http://ip-api.com/json/");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        if (isMounted) { // Only update state if still mounted
          setCountry(data.country);
          setCountryCode(data.countryCode); // Set country code
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          toast.error("country"); // Display error as toast
          setLoading(false);
        }
      }
    };

    fetchCountry();

    return () => {
      isMounted = false; // Clean up if component unmounts
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Country: {country}</h1>
      {countryCode ? ( // Conditionally render the Flag component
        <Flag code={countryCode}  width="100" />
      ) : (
        <p>No flag available</p>
      )}
      <ToastContainer /> {/* Add ToastContainer to your component */}
    </div>
  );
};

export default CountryPage;
