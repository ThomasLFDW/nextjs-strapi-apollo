export async function fetchHomepageData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
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
      `,
    }),
  });

  const json = await res.json();
  return json.data.homepage.data.attributes;
}
