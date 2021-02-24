import Head from "next/head";

import { getMenu } from "../lib/api";
import Testimonials from "./home/HomeComponents/Testimonials/Testimonials";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import loadable from "@loadable/component";
export const client = new ApolloClient({
  uri: "https://wp.na.stronazen.pl/graphql",
  cache: new InMemoryCache(),
});

const QUERY = gql`
  query MyQuery {
    logos {
      edges {
        node {
          featuredImage {
            node {
              sourceUrl
              title
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
`;
const Banner = loadable(() => import("./home/HomeComponents/Banner/Banner"));
const Logos = loadable(() => import("./home/HomeComponents/Logos/Logos"));

const Offers = loadable(() => import("./home/HomeComponents/Offers/Offers"));
const Header = loadable(() => import("./header"));

const Footer = loadable(() => import("./footer"));

export default function Home({ menu: { menus } }) {
  const { data } = useQuery(QUERY, { client: client });
  return (
    <ApolloProvider client={client}>
      <div>
        <Head>
          <title>Youngmedia</title>
          <link rel="icon" href="/logo_fav.png" />
        </Head>
        <Header menu={menus} />
        <main>
          <Banner />
          <Offers offers={data ? data.offers : null} />
          <Logos logos={data ? data.logos : null} />
          <Testimonials testimonials={data ? data.testimonials : null} />
        </main>

        <Footer />
      </div>
    </ApolloProvider>
  );
}
export async function getStaticProps() {
  const menu = await getMenu();

  return {
    props: {
      menu,
    },
  };
}
