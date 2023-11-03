import React from "react";
import styles from "./styles.module.css";

const testimonials = [
  {
    message:
      "With ReductStore's approach to data retention, we have forgotten about the disk overrun problems on our edge devices.",
    author: "Ingo Kaiser",
    position: "CEO and Co-founder",
    company: "PANDA GmbH",
    homepage: "https://panda.technology",
    image: require("@site/static/img/testimonials/panda.png").default,
  },
  {
    message:
      "The main reason for choosing ReductStore was that it was quick and easy to deploy, use and integrate. This allowed us to have a working system up and running and ingesting data within a day.",
    author: "Daniel Wedlund",
    position: "Founder",
    company: "Mounte AB",
    homepage: "https://mounte.se",
    image: require("@site/static/img/testimonials/mounte.png").default,
  },
  {
    message:
      "ReductStore is a vital part of our infrastructure. It handles terabytes of unstructured data in a production environment.",
    author: "Michael Welsh",
    position: "Founder",
    company: "Metric Space UG",
    homepage: "https://www.metric-space.ai/",
    image: require("@site/static/img/testimonials/metric-space.png").default,
  },
];

function HomepageTestimonials() {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className="row">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col col--4">
              <img
                src={testimonial.image}
                alt={`${testimonial.company} logo`}
                className={styles.testimonialImage}
              />
              <div className={styles.message}>
                <span>"{testimonial.message}"</span>
              </div>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{testimonial.author}</div>
                {testimonial.position} at{" "}
                <a href={testimonial.homepage}>{testimonial.company}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomepageTestimonials;
