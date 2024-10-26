"use client";

import { useState, useEffect } from "react";

interface CountryData {
  country: string | null;
  countryCode: string | null;
  error: string | null;
  isLoading: boolean;
}

export function useCountry(): CountryData {
  const [country, setCountry] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("http://ip-api.com/json/");
        const data = await response.json();
        setCountry(data.country);
        setCountryCode(data.countryCode);
      } catch (err) {
        setError("Failed to fetch country data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, []);

  return { country, countryCode, error, isLoading };
}