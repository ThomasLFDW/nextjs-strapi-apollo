// app/page.tsx
"use client";

import { gql, useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { useState, useEffect } from 'react';

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
  const [homepage, setHomepage] = useState(null);
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {
    client,
  });

  useEffect(() => {
    if (data) {
      setHomepage(data.homepage.data.attributes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {homepage && (
        <>
          <h1>{homepage.Titre}</h1>
          <p>{homepage.Description}</p>
          {homepage.Logo && <img src={homepage.Logo.url} alt="Homepage Image" />}
        </>
      )}
    </div>
  );
}

export default Homepage;
