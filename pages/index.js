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
export default function Home({
  allPosts: { menus, logos, offers, testimonials },
}) {
  const [updateTodo] = useMutation(UPDATE_TODO, { client: client });

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
          <Offers offers={offers} />
          <Logos logos={logos} />
          <Testimonials testimonials={testimonials} />
        </main>

        <Footer />
      </div>
    </ApolloProvider>
  );
}
export async function getStaticProps() {
  const allPosts = await getMenu();

  return {
    props: {
      allPosts,
    },
  };
}
