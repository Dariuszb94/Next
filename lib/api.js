async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { "Content-Type": "application/json" };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch("http://wp.na.stronazen.pl/graphql/", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  // error handling work
  const json = await res.json();
  if (json.errors) {
    console.log(json);

    console.log(json.errors);
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getRest(preview) {
  const data = await fetchAPI(
    `
    query MyQuery {
      logos {
        edges {
          node {
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      offers {
        edges {
          node {
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      testimonials {
        edges {
          node {
            title
            quote {
              cytat
            }
          }
        }
      }
    }
    
      `
  );

  return {
    logos: data.logos,
    offers: data.offers,
    testimonials: data.testimonials,
  };
}
export async function getMenu(preview) {
  const data = await fetchAPI(
    `
    query MyQuery {
      menus(where: {id: 2}) {
        edges {
          node {
            menuItems {
              edges {
                node {
                  label
                  path
                }
              }
            }
          }
        }
      }
    }
    
      `
  );

  return {
    menus: data.menus,
  };
}
