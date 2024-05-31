import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import styles from "./styles.module.css";
import PricingPlan from "./PricingPlan";
import { FaCheckCircle } from "react-icons/fa";

interface PaymentLinks {
  standard: string;
  premium: string;
  iot: string;
}

const checkedIcon = <FaCheckCircle color="green" size="1.2em" />;

const promotion = {
  discount: 0.2,
  originalPrices: {
    standard: 150,
    premium: 300,
    iot: 100,
  }
};

const getPromotionalPrice = (price: number) => (price * promotion.discount).toFixed(0);

export default function PricingTable() {
  const { siteConfig } = useDocusaurusContext();
  const { themeConfig } = siteConfig;
  const paymentLinks = themeConfig.paymentLinks as PaymentLinks;

  return (
    <section>
      <div className={clsx("row", styles.pricingTable)}>
        <PricingPlan
          title="Community"
          subtitle="For startups and small capital"
          price="FREE"
          priceUnit=""
          description="For research, testing, development. Commercial use in production limited to companies with capital less than 2 million USD."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            { title: "Support", description: "Community on GitHub or Chat", descriptionDetail: "Only latest stable version" },
            { title: "Long Term Release Support", description: "-" },
            { title: "Architecture Review", description: "-" }
          ]}
          buttonUrl="/download"
          buttonLabel="Download"
          isFree
        />
        <PricingPlan
          title="Standard"
          subtitle="For small scale enterprises"
          price={`$${getPromotionalPrice(promotion.originalPrices.standard)}`}
          originalPrice={`$${promotion.originalPrices.standard}`}
          priceUnit="/ TB / year"
          description="For commercial production use in non-critical applications."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            { title: "Support", description: "Up to 2 business days, Email or Chat" },
            { title: "Long Term Release Support", description: "1 year" },
            { title: "Architecture Review", description: "-" }
          ]}
          buttonUrl={paymentLinks.standard}
          buttonLabel="Choose Standard"
        />
        <PricingPlan
          title="Premium"
          subtitle="For critical applications"
          price={`$${getPromotionalPrice(promotion.originalPrices.premium)}`}
          originalPrice={`$${promotion.originalPrices.premium}`}
          priceUnit="/ TB / year"
          description="For commercial production use in critical applications with minimum 5TB storage capacity."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            { title: "Support", description: "Up to 4 hours, Email, Chat, Video call" },
            { title: "Long Term Release Support", description: "3 years" },
            { title: "Architecture Review", description: checkedIcon }
          ]}
          buttonUrl={paymentLinks.premium}
          buttonLabel="Choose Premium"
          isHighlight
        />
        <PricingPlan
          title="IoT"
          subtitle="For many small nodes"
          price={`$${getPromotionalPrice(promotion.originalPrices.iot)}`}
          originalPrice={`$${promotion.originalPrices.iot}`}
          priceUnit="/ device / year"
          description="For commercial production use with minimum 10 devices with less than 1TB of storage capacity per unit."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            { title: "Support", description: "Up to 2 business days, Email or Chat" },
            { title: "Long Term Release Support", description: "1 year" },
            { title: "Architecture Review", description: checkedIcon }
          ]}
          buttonUrl={paymentLinks.iot}
          buttonLabel="Choose IoT"
        />
      </div>
    </section>
  );
}
