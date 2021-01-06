import React from "react";
import styles from "../../../../styles/Banner.module.css";
import { getMenu } from "../../../../lib/api";
const Banner = ({ allPosts: { edges } }) => {
  return <section>{edges.map(({ node }) => console.log(node))}</section>;
};

export default Banner;
export async function getServerSideProps() {
  const allPosts = await getMenu();
  return {
    props: {
      allPosts,
    },
  };
}
