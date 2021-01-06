import React, { useState, useEffect } from "react";

const Menu = ({ menuItems, showMenu }) => {
  return (
    <ul className={`menu menu${showMenu ? "--active" : "--inactive"}`}>
      {menuItems
        ? menuItems.menus.edges[0].node.menuItems.edges.map(function (item, i) {
            return (
              <li key={i} className="menu__element">
                <a
                  className="menu__element__link"
                  href={`/Youngmedia${item.node.path}`}
                >
                  {item.node.label}
                </a>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default Menu;
