// app/page.tsx
'use client';

import { gql, useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { HomepageResponse } from './types';

const GET_HOMEPAGE = gql`
  query Homepage {
    homepage {
      data {
        id
        attributes {
          Titre
          Description
          Logo {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function Homepage() {
  const { loading, error, data } = useQuery<HomepageResponse>(GET_HOMEPAGE, {
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const homepage = data?.homepage?.data?.attributes;
  const relativeImageUrl = homepage?.Logo?.data[0]?.attributes?.url;
  const imageUrl = relativeImageUrl
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${relativeImageUrl}`
    : null;

  console.log(imageUrl);

  return (
    <div>
      {homepage ? (
        <>
          <h1>{homepage.Titre || 'Titre indisponible'}</h1>
          <p>{homepage.Description || 'Description indisponible'}</p>
          {imageUrl ? (
            <img src={imageUrl} alt="Homepage Image" />
          ) : (
            <p>Image indisponible</p>
          )}
        </>
      ) : (
        <p>{'Données de la page d\'accueil indisponibles'}</p>
      )}
    </div>
  );
}

export default Homepage;
