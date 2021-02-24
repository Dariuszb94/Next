import Head from "next/head";
import { getMenu } from "../../lib/api";
import React, { useState } from "react";
import Header from "../header/index";
import Footer from "../footer/index";
import Icons from "./kontaktComponents/icons";
import Map from "./kontaktComponents/map";

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
export default function StronyInternetowe({ allPosts: { menus } }) {
  const [subject, subjectSet] = useState("");
  const [name, nameSet] = useState("");
  const [contact, contactSet] = useState("");
  const [invalid, invalidSet] = useState(false);
  const [sentSuccess, sentSuccessSet] = useState(false);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    client: client,
    onCompleted(data) {
      sentSuccessSet(data.sendEmail.sent);
    },
  });
  let input = {
    body:
      "Imię i nazwisko :" +
      name +
      "<br />" +
      "kontakt: " +
      contact +
      "<br/>" +
      subject,
    from: "db@youngmedia.pl",
    subject: "Strony internetowe",
    to: "greedo904@gmail.com",
  };

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Youngmedia - Kontakt</title>
        <link rel="icon" href="/logo_fav.png" />
        <meta
          name="description"
          content="Youngmedia - Tworzymy zaawansowane serwisy www"
        ></meta>
      </Head>
      <Header menu={menus} />
      <main className="contact">
        <hr className="separator" />
        <div className="strony-banner">
          <h1 className="strony-banner__title">Kontakt</h1>
        </div>
        <Icons />
        <div className="form-container">
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
                  onChange={(e) => nameSet(e.target.value)}
                  className={`form__input form__input${
                    !name && invalid ? "--invalid" : ""
                  }`}
                  placeholder="Imie i nazwisko"
                />
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
                    contact && subject && name ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    contact && subject && name
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
        <Map />
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
