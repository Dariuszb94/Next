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
  mutation MyMutation($input: SendEmailInput!) {
    sendEmail(input: $input) {
      message
      origin
    }
  }
`;
export default function StronyInternetowe({
  allPosts: { menus, logos, offers, testimonials },
}) {
  const [subject, subjectSet] = useState("test");

  const [updateTodo, { data }] = useMutation(UPDATE_TODO, { client: client });
  let input = {
    body: "aaassdfsdfaa",
    from: "db@youngmedia.pl",
    subject: subject,
    to: "greedo904@gmail.com",
  };

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Youngmedia - Strony Internetowe</title>
        <link rel="icon" href="/logo_fav.png" />
      </Head>
      <Header menu={menus} />
      <main>
        <hr className="separator" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTodo({ variables: { input: input } });
          }}
        >
          <input onChange={(e) => subjectSet(e.target.value)} />
          <button type="submit">Add Todo</button>
        </form>
      </main>
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
