import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "./home/HomeComponents/Banner/Banner";
import Logos from "./home/HomeComponents/Logos/Logos";
import Offers from "./home/HomeComponents/Offers/Offers";
import Header from "./header";
import Footer from "./footer";
import { getMenu } from "../lib/api";
import Testimonials from "./home/HomeComponents/Testimonials/Testimonials";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

import Test from "./Test";
const client = new ApolloClient({
  uri: "https://wp.na.stronazen.pl/graphql",
  cache: new InMemoryCache(),
});

export default function Home({
  allPosts: { menus, logos, offers, testimonials },
}) {
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
        <Test />

        <Footer />
      </div>
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
