"use client";

import { useState, useEffect } from "react";
import Flag from "react-world-flags"; // Import Flag component
import { toast } from "sonner";
import FishLoader from "@/components/FishLoader";

// CountryFlag component to fetch and display the flag
export const CountryFlag = () => {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ip-api.com/json/");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        if (isMounted) { // Only update state if still mounted
          setCountryCode(data.countryCode); // Set country code
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          toast.error("Failed to fetch country data"); // Display error as toast
          setLoading(false);
        }
      }
    };

    fetchCountry();

    return () => {
      isMounted = false; // Clean up if component unmounts
    };
  }, []);

  if (loading) {
    return <FishLoader />; // Show fish loader while loading
  }

  return (
    <div>
      {countryCode ? ( // Conditionally render the Flag component
        <Flag code={countryCode} width="100" />
      ) : (
        <p>No flag available</p>
      )}
    </div>
  );
};

// CountryPage component to display the country name
const CountryPage = () => {
  const [country, setCountry] = useState<string | null>(null);
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
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          toast.error("Failed to fetch country data"); // Display error as toast
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
    </div>
  );
};

export default CountryPage;
