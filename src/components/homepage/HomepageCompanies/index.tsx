import React from "react";
import styles from "./styles.module.css";

const companies = [
  {
    image: require("@site/static/img/companies/panda.webp").default,
    alt: "PANDA Logo",
  },
  {
    image: require("@site/static/img/companies/mounte.webp").default,
    alt: "Mounte Logo",
  },
  {
    image: require("@site/static/img/companies/metric_space.webp").default,
    alt: "Metric Space Logo",
  },
  {
    image: require("@site/static/img/companies/hcs.webp").default,
    alt: "HCS Digital Logo",
  },
  {
    image: require("@site/static/img/companies/rotec.webp").default,
    alt: "ROTEC Logo",
  },
  {
    image: require("@site/static/img/companies/insaion.webp").default,
    alt: "INSAION Logo",
  },
];

const loopCompanies = [...companies, ...companies];

function HomepageCompanies() {
  return (
    <section className={styles.companiesSection}>
      <div className={styles.companiesWrapper}>
        <div className={styles.companiesTrack}>
          {loopCompanies.map((company, index) => (
            <div key={index} className={styles.companyBox}>
              <img
                src={company.image}
                alt={company.alt}
                className={styles.companyImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomepageCompanies;
