import React, { useEffect, useState } from "react";

const Logos = ({ logos }) => {
  const [isMobile, changeIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", listenForResize);
    listenForResize();
    return function cleanup() {
      window.removeEventListener("resize", listenForResize);
    };
  });

  const listenForResize = () => {
    if (window.innerWidth < 1000) {
      changeIsMobile(true);
    } else {
      changeIsMobile(false);
    }
  };

  useEffect(() => {
    if (document.querySelector(".logo")) {
      if (!isMobile)
        document.querySelectorAll(".logos-list").forEach((el) => {
          el.style.gridTemplateColumns = `repeat( ${logos.edges.length},1fr)`;
        });
      else {
        document.querySelectorAll(".logos-list").forEach((el) => {
          el.style.gridTemplateColumns = `repeat( 2,1fr)`;
        });
      }
    }
  });

  return (
    <section className="logos-section">
      <header className="logos__header">
        Mieliśmy przyjemność pracować dla:
      </header>
      <ul className="logos-list">
        {logos
          ? logos.edges.map(function (item, i) {
              return (
                <li key={i} className="logo">
                  <img
                    className="logo__img"
                    src={item.node.featuredImage.node.sourceUrl}
                    alt={item.node.featuredImage.node.title}
                    width="160"
                    height="160"
                  />
                </li>
              );
            })
          : null}
      </ul>
    </section>
  );
};

export default Logos;
