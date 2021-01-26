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
  const [subject, subjectSet] = useState("");
  const [contact, contactSet] = useState("");
  const [invalid, invalidSet] = useState(false);

  const [updateTodo, { data }] = useMutation(UPDATE_TODO, { client: client });
  let input = {
    body: contact + ":" + subject,
    from: "db@youngmedia.pl",
    subject: "Strony internetowe",
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
        <div className="form-container">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              updateTodo({ variables: { input: input } });
            }}
          >
            <input
              onChange={(e) => contactSet(e.target.value)}
              className={`form__input${!contact && invalid ? "--invalid" : ""}`}
              placeholder="Email lub telefon"
            />
            <textarea
              onChange={(e) => subjectSet(e.target.value)}
              className={`form__textarea${
                !subject && invalid ? "--invalid" : ""
              }`}
              placeholder="Wiadomość"
            />
            <button
              type="submit"
              className={`form__submit--${
                contact && subject ? "active" : "inactive"
              }`}
              onClick={() => {
                contact && subject
                  ? (e) => subjectSet(e.target.value)
                  : invalidSet(true);
              }}
            >
              Wyślij
            </button>
          </form>
        </div>
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
