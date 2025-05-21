import React from "react";
import styles from "./styles.module.css";

const partners = [
  {
    image: require("@site/static/img/partners/Google_Cloud_Partner.webp")
      .default,
    alt: "Google Cloud Partner Logo",
  },
  {
    image: require("@site/static/img/partners/Microsoft_Partner.webp").default,
    alt: "Microsoft Solutions Partner Logo",
  },
  {
    image: require("@site/static/img/partners/Innofounder.webp").default,
    alt: "Innofounder Logo",
  },
];

function HomepagePartners() {
  return (
    <section className={styles.partners}>
      {partners.map((partner) => (
        <img
          src={partner.image}
          alt={partner.alt}
          className={styles.partnerImage}
        />
      ))}
    </section>
  );
}

export default HomepagePartners;
