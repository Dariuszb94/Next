import React from "react";

export default function Map() {
  return (
    <section className="map">
      <iframe
        className="map-main"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.8917235096783!2d18.982527523082712!3d50.12574804806156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716b873578dc881%3A0x93391d47033ac8fa!2syoungmedia%20agencja%20interaktywna!5e0!3m2!1spl!2spl!4v1614020795023!5m2!1spl!2spl"
        width="100%"
        height="450"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </section>
  );
}
