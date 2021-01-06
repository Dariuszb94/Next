import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Banner from "./home/HomeComponents/Banner/Banner";
import Header from "./header";
import { getMenu } from "../lib/api";

export default function Home({ allPosts: { edges } }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menu={edges} />
      <main>
        <Banner />
        <Link href="/blog">
          <a>blog articles page</a>
        </Link>
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
