import React, { useEffect, useState } from "react";

const Offers = ({ offers }) => {
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
    if (document.querySelector(".offer")) {
      if (!isMobile)
        document.querySelectorAll(".offers-list").forEach((el) => {
          el.style.gridTemplateColumns = `repeat( ${offers.edges.length},1fr)`;
        });
      else {
        document.querySelectorAll(".offers-list").forEach((el) => {
          el.style.gridTemplateColumns = `repeat( 2,1fr)`;
        });
      }
    }
  });

  return (
    <section className="offers-section">
      <ul className="offers-list">
        {offers
          ? offers.edges.map(function (item, i) {
              return (
                <li key={i} className="offer">
                  <div className="offer__img-container">
                    <img
                      className="offer__img"
                      src={item.node.featuredImage.node.sourceUrl}
                    />
                  </div>
                  <h2 className="offer__title">{item.node.title}</h2>
                </li>
              );
            })
          : null}
      </ul>
    </section>
  );
};

export default Offers;
