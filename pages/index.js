import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "./home/HomeComponents/Banner/Banner";
import Logos from "./home/HomeComponents/Logos/Logos";
import Offers from "./home/HomeComponents/Offers/Offers";
import Header from "./header";
import Footer from "./footer";
import { getMenu } from "../lib/api";
import Testimonials from "./home/HomeComponents/Testimonials/Testimonials";
import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://wp.na.stronazen.pl/graphql",
  cache: new InMemoryCache(),
});
const UPDATE_TODO = gql`
  mutation MyMutation {
    __typename
    sendEmail(
      input: {
        body: "aaassdfsdfaa"
        from: "db@youngmedia.pl"
        subject: "AAAAA"
        to: "greedo904@gmail.com"
      }
    ) {
      message
      origin
    }
  }
`;
const EXCHANGE_RATES = gql`
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
`;

export default function Home({ menu: { menus } }) {
  const [updateTodo] = useMutation(UPDATE_TODO, { client: client });
  const { loading, error, data } = useQuery(EXCHANGE_RATES, { client: client });
  return (
    <ApolloProvider client={client}>
      <div>
        {console.log(data)}
        {data ? console.log(data.logos[0]) : null}
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
// export async function getServerSideProps() {
//   const allPosts = await getRest();

//   return {
//     props: {
//       allPosts,
//     },
//   };
// }
