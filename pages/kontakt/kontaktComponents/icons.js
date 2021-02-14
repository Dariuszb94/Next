import React, { useEffect, useState } from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
export default function Icons() {
  return (
    <section className="icons">
      <div>
        <LocationOnIcon className="icons__icon" />
        <div>
          PL. BACZYŃSKIEGO 2<br />
          43-100 TYCHY
        </div>
      </div>
    </section>
  );
}
