import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

function PricingPlan({
  title,
  price,
  description,
  features,
  buttonUrl,
  buttonLabel,
  isEnterprise,
}) {
  return (
    <div
      className={clsx("col col--6", styles.plan, {
        [styles.enterprise]: isEnterprise,
      })}
    >
      <div className="card">
        <div className="card__header">
          <h2>{title}</h2>
        </div>
        <div className="card__body">
          <h3>{price}</h3>
          <p>{description}</p>
          <ul>
            {features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="card__footer">
          <a href={buttonUrl} className="button button--primary">
            {buttonLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PricingTable() {
  return (
    <section className={styles.pricingTable}>
      <div className="row">
        <PricingPlan
          title="Community"
          price="Totally Free of Charge"
          description="Ideal for entities with finances below $2M"
          features={[
            "Unbounded Usage",
            "Open Source & Free",
            "No Limitations on Features",
          ]}
          buttonUrl="https://docs.reduct.store/"
          buttonLabel="Get Started"
          isEnterprise={false}
        />
        <PricingPlan
          title="Enterprise Edition"
          price="Custom Pricing"
          description="For larger firms needing custom solutions"
          features={[
            "Unlimited Usage",
            "Free Development Usage",
            "Storage-Based Pricing",
            "Continuous Support and Guidance",
          ]}
          buttonUrl="/contact"
          buttonLabel="Contact Sales"
          isEnterprise={true}
        />
      </div>
    </section>
  );
}
