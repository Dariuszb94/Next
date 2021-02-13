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
      sent
    }
  }
`;
export default function AplikacjeWebowe({
  allPosts: { menus, logos, offers, testimonials },
}) {
  const [subject, subjectSet] = useState("");
  const [contact, contactSet] = useState("");
  const [invalid, invalidSet] = useState(false);
  const [sentSuccess, sentSuccessSet] = useState(false);
  const [updateTodo, { data }] = useMutation(UPDATE_TODO, {
    client: client,
    onCompleted(data) {
      sentSuccessSet(data.sendEmail.sent);
    },
  });
  <span className="form__success">{sentSuccess ? "Wysłano!" : null}</span>;
  let input = {
    body: contact + ":" + subject,
    from: "db@youngmedia.pl",
    subject: "Aplikacje Webowe",
    to: "greedo904@gmail.com",
  };

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Youngmedia - Aplikacje Webowe</title>
        <link rel="icon" href="/logo_fav.png" />
      </Head>
      <Header menu={menus} />
      <main>
        <hr className="separator" />
        <div className="strony-banner">
          <h1 className="strony-banner__title">Aplikacje Webowe</h1>
        </div>
        <div className="form-container">
          <div className="form-text">
            <p>
              Masz już stworzone logo, wydrukowany papier firmowy i koperty a
              nawet wizytówkę na wypadek gdyby ktoś chciał namiar na Twoją
              firmę? Stworzyłeś też stronę internetową, na której
              zaprezentowałeś się z najlepszej strony oraz zamieściłeś skrzętnie
              przygotowaną ofertę? Jesteś gotowy aby w końcu zarabiać duże
              pieniądze, ale… klienci nie przychodzą? Zdecydowanie potrzebna Ci
              reklama. W telewizji - za drogo. W lokalnej prasie… zbyt lokalnie.
              Internet - strzał w dziesiątkę - nie za drogo i globalnie.
            </p>
          </div>
          <div className="form-main-container">
            <div className="form-header">Napisz do nas!</div>
            <div className="form-main">
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  onChange={(e) => contactSet(e.target.value)}
                  className={`form__input form__input${
                    !contact && invalid ? "--invalid" : ""
                  }`}
                  placeholder="Email lub telefon"
                />
                <textarea
                  onChange={(e) => subjectSet(e.target.value)}
                  className={`form__textarea form__textarea${
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
                      ? updateTodo({ variables: { input: input } })
                      : invalidSet(true);
                  }}
                >
                  Wyślij
                </button>
                <span className="form__success">
                  {sentSuccess ? "Wysłano!" : null}
                </span>
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
