// components/MetaTags.tsx
import React from 'react';
import Head from 'next/head';

const MetaTags: React.FC = () => {
  return (
    <Head>
      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content="The Fish Way" />
      <meta property="og:title" content="All in One!" />
      <meta property="og:description" content="Visit us!" />
      <meta property="og:url" content="/barndlogo.png" />

      {/* Image for Link Preview */}
      <meta property="og:image" content="/barndlogo.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />

      {/* Twitter Meta Tags for better Twitter integration */}
      <meta name="telegram:card" content="summary_large_image" />
      <meta name="telegram:title" content="225 Days of Self Sanitizing Surface from Coronavirus" />
      <meta name="telegram:description" content="Just 1 time application" />
      <meta name="telegram:image" content="/barndlogo.png" />
    </Head>
  );
};

export default MetaTags;
