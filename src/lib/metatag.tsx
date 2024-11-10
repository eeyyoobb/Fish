// components/MetaTags.tsx
import React from 'react';
import Head from 'next/head';

const MetaTags: React.FC = () => {
  return (
    <Head>
      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content="Pure Surface" />
      <meta property="og:title" content="225 Days of Self Sanitizing Surface from Coronavirus" />
      <meta property="og:description" content="Just 1 time application" />
      <meta property="og:url" content="http://localhost:3000/income/registration" />

      {/* Image for Link Preview */}
      <meta property="og:image" content="http://puresurface.in/200x200-png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />

      {/* Twitter Meta Tags for better Twitter integration */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="225 Days of Self Sanitizing Surface from Coronavirus" />
      <meta name="twitter:description" content="Just 1 time application" />
      <meta name="twitter:image" content="http://puresurface.in/200x200-png" />
    </Head>
  );
};

export default MetaTags;
