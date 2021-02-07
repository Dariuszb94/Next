import React, { useState, useEffect } from "react";
import Menu from "./HeaderComponents/Menu";
import { getMenu } from "../../lib/api";
import BurgerOpen from "@material-ui/icons/Menu";
import BurgerClose from "@material-ui/icons/Close";

// import { gql, useMutation } from "@apollo/client";
const Header = ({ menu }) => {
  // const TOGGLE_TODO = gql`
  //   mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
  //     update_todos(
  //       where: { id: { _eq: $id } }
  //       _set: { is_completed: $isCompleted }
  //     ) {
  //       affected_rows
  //     }
  //   }
  // `;
  //const [toggleTodoMutation] = useMutation(TOGGLE_TODO);
  const [showMenu, showMenuChange] = useState(false);
  return (
    <section className="header">
      {menu ? (
        <div className="header__content">
          <a href="/">
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
