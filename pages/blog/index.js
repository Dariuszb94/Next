import Head from "next/head";
import Link from "next/link";

// data
import { getAllPosts } from "../../lib/api";

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
      <section>
        {edges.map(({ node }) => (
          <div>{node.title}</div>
        ))}
      </section>
    </main>
  </div>
);
export default Blog;
export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
}
