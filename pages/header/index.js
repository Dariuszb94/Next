import React, { useState, useEffect } from "react";
import Menu from "./HeaderComponents/Menu";
// import Logo from "../../Assets/logo_front.png";
import { getMenu } from "../../lib/api";

const Header = ({ menu }) => {
  const [showMenu, showMenuChange] = useState(false);
  return (
    <section className="header">
      {menu ? (
        <div className="header__content">
          <a href="/Youngmedia">
            {/* <img className="header__logo" src={Logo} alt="ym" /> */}
          </a>
          <Menu menuItems={menu} showMenu={showMenu} />
          {/* {!showMenu ? (
            <BurgerOpen
              className="menu__burger menu__burger--open"
              onClick={() => showMenuChange(true)}
            />
          ) : null} */}
          {/* {showMenu ? (
            <BurgerClose
              className=" menu__burger menu__burger--close"
              onClick={() => showMenuChange(false)}
            />
          ) : null} */}
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
