import React, { useEffect, useState } from "react";

const Testimonials = ({ testimonials }) => {
  const [currentTestimonial, currentTestimonialChange] = useState(0);

  return (
    <section className="testimonials-section">
      <header className="testimonials__header">Referencje</header>
      <ul className="testimonials-list">
        {testimonials
          ? testimonials.edges.map(function (item, i) {
              if (i === currentTestimonial)
                return (
                  <li key={i} className="testimonial">
                    {console.log(item)}
                    <p className="testimonial__content">
                      {'"' + item.node.quote.cytat + '"'}
                    </p>
                    <p className="testimonial__author">{item.node.title}</p>
                  </li>
                );
            })
          : null}
      </ul>
      <ul className="testimonials-toggle">
        {testimonials
          ? testimonials.edges.map(function (item, i) {
              return (
                <li
                  key={i}
                  onClick={() => currentTestimonialChange(i)}
                  className={`toggle__dot${
                    i === currentTestimonial ? "--active" : "--inactive"
                  }`}
                ></li>
              );
            })
          : null}
      </ul>
    </section>
  );
};

export default Testimonials;
