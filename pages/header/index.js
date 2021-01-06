import React, { useState, useEffect } from "react";
import Menu from "./HeaderComponents/Menu";
import { getMenu } from "../../lib/api";

const Header = ({ menu }) => {
  return <section>{menu.map(({ node }) => console.log(node))}</section>;
};

export default Header;
export async function getServerSideProps() {
  const allPosts = await getMenu();
  return {
    props: {
      allPosts,
    },
  };
}
