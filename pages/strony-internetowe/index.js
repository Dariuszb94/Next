import Head from "next/head";
import { getMenu } from "../../lib/api";
import React, { useEffect, useState } from "react";
import Header from "../header/index";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
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
      <Head>
        <title>Youngmedia - Strony Internetowe</title>
        <link rel="icon" href="/logo_fav.png" />
      </Head>
      <Header menu={menus} />
    </ApolloProvider>
  );
}
export async function getServerSideProps() {
  const allPosts = await getMenu();

  return {
    props: {
      allPosts,
    },
  };
}
