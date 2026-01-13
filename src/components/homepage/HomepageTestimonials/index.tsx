import React, { useRef } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

const testimonials = [
  {
    message:
      "In the rare case of issues or for feature requests, quick support is vital. ReductStore delivers exceptional response times to any issues coming up, allowing for rapid development.",
    author: "Phil Malessa",
    position: "Hardware Engineer",
    company: "ROTEC GmbH",
  },
  {
    message:
      "With ReductStore, it was surprisingly easy to get started. I could ingest and query my data right away without dealing with complex setups or database administration. That simplicity is exactly what makes it so valuable for me..",
    author: "Ankit Ghosh",
    position: "AI Developer",
    company: "HCS Digital, GmbH",
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
    author: "Michael Welsch",
    position: "Founder",
    company: "Metric Space UG",
  },
  {
    message:
      "ReductStore perfectly aligns with the INSAION philosophy of robotics observability. Managing high-frequency, unstructured sensor data is one of the most significant hurdles in robotics, and ReductStore solves it with a tool that is remarkably performant and built for real-world hardware constraints. By integrating it into our platform, we've enabled our clients to stop worrying about data collection and focus entirely on building their robots and autonomous layers.",
    author: "Victor Massagué Respall",
    position: "Co-founder & CTO",
    company: "INSAION",
  },
];

const messageLengths = testimonials.map((t) => t.message.length);
const MIN_LEN = Math.min(...messageLengths);
const MAX_LEN = Math.max(...messageLengths);

const loopTestimonials = [...testimonials, ...testimonials];

function HomepageTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "paused";
    }
  };
  const handleMouseLeave = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "running";
    }
  };

  const getCardStyle = (msg: string) => {
    const minWidth = 250;
    const maxWidth = 450;

    const len = msg.length;
    const range = Math.max(1, MAX_LEN - MIN_LEN);

    const t = Math.min(1, Math.max(0, (len - MIN_LEN) / range));
    const width = minWidth + t * (maxWidth - minWidth);

    return { maxWidth: Math.round(width) };
  };

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsWrapper}>
        <div
          className={styles.testimonialsTrack}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {loopTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={clsx("card margin--md", styles.testimonialCard)}
              style={getCardStyle(testimonial.message)}
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
