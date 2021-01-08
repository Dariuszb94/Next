import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "./home/HomeComponents/Banner/Banner";
import Logos from "./home/HomeComponents/Logos/Logos";
import Header from "./header";
import { getMenu } from "../lib/api";

export default function Home({ allPosts }) {
  return (
    <div>
      {console.log(allPosts)}
      <Head>
        <title>Youngmedia</title>
        <link rel="icon" href="/logo_fav.png" />
      </Head>
      <Header menu={allPosts[0]} />
      <main>
        <Banner />
        <Logos logos={allPosts[1]} />
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
