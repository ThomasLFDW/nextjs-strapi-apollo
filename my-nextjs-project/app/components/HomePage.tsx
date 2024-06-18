import React from 'react';
import Image from 'next/image';
import { fetchHomepageData } from '../lib/fetchHomepageData';

const HomePage = async () => {
  const homepage = await fetchHomepageData();

  const relativeImageUrl = homepage?.Logo?.data[0]?.attributes?.url;
  const imageUrl = relativeImageUrl
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${relativeImageUrl}`
    : null;

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Homepage Image"
          width={500}
          height={300}
          priority
          style={{ width: '100%', height: 'auto' }} // Utiliser style pour définir les dimensions
        />
      ) : (
        <p>Image indisponible</p>
      )}
      <h1>{homepage?.Titre || 'Titre indisponible'}</h1>
      <p>{homepage?.Description || 'Description indisponible'}</p>
    </div>
  );
};

export default HomePage;
