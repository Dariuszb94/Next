import Head from "next/head";
import { getMenu } from "../../lib/api";
import React, { useEffect, useState } from "react";
import Header from "../header/index";
import Footer from "../footer/index";

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
export default function FilmyReklamowe({
  allPosts: { menus, logos, offers, testimonials },
}) {
  const [subject, subjectSet] = useState("");
  const [contact, contactSet] = useState("");
  const [invalid, invalidSet] = useState(false);

  const [updateTodo, { data }] = useMutation(UPDATE_TODO, { client: client });
  let input = {
    body: contact + ":" + subject,
    from: "db@youngmedia.pl",
    subject: "Filmy Reklamowe",
    to: "greedo904@gmail.com",
  };

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Youngmedia - Filmy Reklamowe</title>
        <link rel="icon" href="/logo_fav.png" />
      </Head>
      <Header menu={menus} />
      <main>
        <hr className="separator" />
        <div className="strony-banner">
          <h1 className="strony-banner__title">Filmy Reklamowe</h1>
        </div>
        <div className="form-container">
          <div className="form-text">
            <p>
              Od dawna wiadomo, że przekaz wizualny ma większe znaczenie niż
              werbalny. Jeśli chcesz dotrzeć do klienta w czysty i przejrzysty
              sposób zaprezentuj mu coś więcej niż ofertę wydrukowaną na
              papierze lub przedstawioną za pomocą tekstu na stronie
              internetowej. W krótkim filmie zaprezentuj siebie i swoje
              możliwości.
            </p>
          </div>
          <div className="form-main-container">
            <div className="form-header">Napisz do nas!</div>
            <div className="form-main">
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateTodo({ variables: { input: input } });
                }}
              >
                <input
                  onChange={(e) => contactSet(e.target.value)}
                  className={`form__input${
                    !contact && invalid ? "--invalid" : ""
                  }`}
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
          </div>
        </div>
      </main>
      <Footer />
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
