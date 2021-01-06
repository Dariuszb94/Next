import Head from "next/head";
import Link from "next/link";

// data
import { getMenu } from "../../lib/api";

// styles

const Blog = ({ allPosts: { edges } }) => (
  <div>
    <Head>
      <title>Blog articles page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Latest blog articles</h1>
      <hr />
      <section>{edges.map(({ node }) => console.log(node))}</section>
    </main>
  </div>
);
export default Blog;
export async function getServerSideProps() {
  const allPosts = await getMenu();
  return {
    props: {
      allPosts,
    },
  };
}
