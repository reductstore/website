import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

const testimonials = [
  {
    message:
      "With ReductStore, it was surprisingly easy to get started. I could ingest and query my data right away without dealing with complex setups or database administration. That simplicity is exactly what makes it so valuable for me..",
    author: "Ankit Ghosh",
    position: "AI Developer",
    company: "HCS Digital, GmbH",
  },
  {
    message:
      "In the rare case of issues or for feature requests, quick support is vital. ReductStore delivers exceptional response times to any issues coming up, allowing for rapid development.",
    author: "Phil Malessa",
    position: "Hardware Engineer",
    company: "ROTEC GmbH",
  },
  {
    message:
      "With ReductStore's approach to data retention, we have forgotten about the disk overrun problems on our edge devices.",
    author: "Ingo Kaiser",
    position: "CEO and Co-founder",
    company: "PANDA GmbH",
  },
  {
    message:
      "The main reason for choosing ReductStore was that it was quick and easy to deploy, use and integrate. This allowed us to have a working system up and running and ingesting data within a day.",
    author: "Daniel Wedlund",
    position: "Founder",
    company: "Mounte AB",
  },
  {
    message:
      "ReductStore is a vital part of our infrastructure. It handles terabytes of unstructured data in a production environment.",
    author: "Michael Welsh",
    position: "Founder",
    company: "Metric Space UG",
  },
];

const loopTestimonials = [...testimonials, ...testimonials];

function HomepageTestimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsWrapper}>
        <div className={styles.testimonialsTrack}>
          {loopTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={clsx("card margin--md", styles.testimonialCard)}
            >
              <div className="card__body">
                <p className={styles.message}>“{testimonial.message}”</p>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.author}</div>
                  <div className={styles.authorDetails}>
                    {testimonial.position} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomepageTestimonials;
