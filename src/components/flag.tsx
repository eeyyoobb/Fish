"use client";
import { useState, useEffect } from "react";
import Flag from "react-world-flags"; // Import Flag component

const CountryPage = () => {
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null); // Store the country code
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("http://ip-api.com/json/");
        const data = await response.json();
        setCountry(data.country);
        setCountryCode(data.countryCode); // Set country code
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch country");
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {country ? (
        <>
          <Flag code={countryCode} alt={`Flag of ${country}`} width="100" /> {/* Display flag using react-world-flags */}
        </>
      ) : (
        <p>Country not found</p>
      )}
    </div>
  );
};

export default CountryPage;
