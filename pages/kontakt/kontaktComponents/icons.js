import React, { useEffect, useState } from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Phone from "@material-ui/icons/phone";

export default function Icons() {
  return (
    <section className="icons">
      <div className="icons__flex">
        <div className="icons__column">
          <LocationOnIcon className="icons__icon" />
          <div className="icons__text">
            PL. BACZYŃSKIEGO 2<br />
            43-100 TYCHY
          </div>
        </div>
        <div className="icons__column">
          <Phone className="icons__icon" />
          <div className="icons__text">
            <a href="+48502678564">502 678 564</a>
          </div>
        </div>
      </div>
    </section>
  );
}
