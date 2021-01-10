import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "./home/HomeComponents/Banner/Banner";
import Logos from "./home/HomeComponents/Logos/Logos";
import Offers from "./home/HomeComponents/Offers/Offers";
import Header from "./header";
import { getMenu } from "../lib/api";

export default function Home({ allPosts: { menus, logos, offers } }) {
  return (
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
      </main>

      <footer className={styles.footer}></footer>
    </div>
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
