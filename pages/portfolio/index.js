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
export default function Portfolio({
  allPosts: { menus, logos, offers, testimonials },
}) {
  const [subject, subjectSet] = useState("");
  const [name, nameSet] = useState("");
  const [contact, contactSet] = useState("");
  const [invalid, invalidSet] = useState(false);
  const [sentSuccess, sentSuccessSet] = useState(false);

  const [updateTodo, { data }] = useMutation(UPDATE_TODO, {
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
        <title>Youngmedia - Portfolio</title>
        <link rel="icon" href="/logo_fav.png" />
        <meta
          name="description"
          content="Youngmedia - Tworzymy zaawansowane serwisy www"
        ></meta>
      </Head>
      <Header menu={menus} />
      <main className="contact">
        <hr className="separator" />
        <div className="portfolio-banner">
          <h1 className="strony-banner__title">Portfolio</h1>
        </div>
        <section className="portfolio-grid"></section>
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
