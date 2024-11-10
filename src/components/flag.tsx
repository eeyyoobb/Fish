"use client";

import React, { useState, useEffect } from 'react';
import { Globe2, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';

interface GeoData {
  country: string;
  countryCode: string;
  city: string;
  region: string;
}

// List of fallback APIs to try in order
const GEO_APIS = [
  'https://ipapi.co/json/',
  'https://api.ipdata.co/?api-key=test', // Free test key
  'https://ipwho.is/',
];

export function CountryDisplay() {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let success = false;
      for (const api of GEO_APIS) {
        if (success) break;
        try {
          const response = await fetch(api);
          if (!response.ok) continue;
          const data = await response.json();

          const processedData = {
            country: data.country_name || data.country || '',
            countryCode: (data.country_code || data.countryCode || '').toLowerCase(),
            city: data.city || '',
            region: data.region || data.region_name || '',
          };

          if (processedData.country && processedData.countryCode) {
            setGeoData(processedData);
            success = true;
            break;
          }
        } catch (err) {
          console.error(`Failed to fetch from ${api}:`, err);
          continue;
        }
      }

      if (!success) {
        setError('Unable to detect your location');
        toast.error('Location detection failed');
      }
      setLoading(false);
    };

    fetchLocation();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Detecting your location...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <LocationDisplay geoData={geoData} />
    </>
  );
}

function LocationDisplay({ geoData }: { geoData: GeoData | null }) {
  if (!geoData) return null;

  return (
    <div className="glass rounded-xl shadow-lg p-8 w-full max-w-md transform transition-all hover:scale-105">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
            <Image
              src={`https://flagcdn.com/${geoData.countryCode}.svg`}
              alt={`${geoData.country} flag`}
              width={96}
              height={96}
              className="object-cover"
              priority
            />
          </div>
          <Globe2 className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-500 dark:text-blue-400 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{geoData.country}</h1>
          {geoData.city && geoData.region && (
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              <p>{geoData.city}, {geoData.region}</p>
            </div>
          )}
        </div>

        <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Country Code</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{geoData.countryCode.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Region</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{geoData.region || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavbarFlag() {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let success = false;
      for (const api of GEO_APIS) {
        if (success) break;
        try {
          const response = await fetch(api);
          if (!response.ok) continue;
          const data = await response.json();

          const processedData = {
            country: data.country_name || data.country || '',
            countryCode: (data.country_code || data.countryCode || '').toLowerCase(),
          };

          if (processedData.country && processedData.countryCode) {
            //@ts-ignore
            setGeoData(processedData);
            success = true;
            break;
          }
        } catch (err) {
          console.error(`Failed to fetch from ${api}:`, err);
          continue;
        }
      }

      if (!success) {
        setError('Unable to detect your location');
        toast.error('Location detection failed');
      }
      setLoading(false);
    };

    fetchLocation();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-16 h-16 flex items-center justify-center">
        <Globe2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-16 h-16 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (geoData) {
    return (
      <div className="relative w-8 h-5 rounded">
        <Image
          src={`https://flagcdn.com/${geoData.countryCode}.svg`}
          alt={`${geoData.country} flag`}
          width={64}
          height={64}
          className="object-cover"
        />
      </div>
    );
  }

  return null;
}
