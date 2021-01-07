import React, { useState, useEffect } from "react";
import Menu from "./HeaderComponents/Menu";
import { getMenu } from "../../lib/api";
import BurgerOpen from "@material-ui/icons/Menu";
import BurgerClose from "@material-ui/icons/Close";
const Header = ({ menu }) => {
  const [showMenu, showMenuChange] = useState(false);
  return (
    <section className="header">
      {menu ? (
        <div className="header__content">
          <a href="/Youngmedia">
            <img className="header__logo" src="/logo_front.png" alt="ym" />
          </a>
          <Menu menuItems={menu} showMenu={showMenu} />
          {!showMenu ? (
            <BurgerOpen
              className="menu__burger menu__burger--open"
              onClick={() => showMenuChange(true)}
            />
          ) : null}
          {showMenu ? (
            <BurgerClose
              className=" menu__burger menu__burger--close"
              onClick={() => showMenuChange(false)}
            />
          ) : null}
          <div className={`overlay${showMenu ? "--active" : ""}`} />
        </div>
      ) : null}
    </section>
  );
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
