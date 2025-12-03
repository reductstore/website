import React from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import ContactForm from "@site/src/components/forms/ContactForm";
import styles from "./styles.module.css";
import clsx from "clsx";
import {
  FaComments,
  FaLifeRing,
  FaLinkedinIn,
  FaYoutube,
  FaBlog,
  FaBook,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface ContactMethod {
  href: string;
  icon: IconType;
  title: string;
  description: string;
  linkText: string;
}

const contactMethods: ContactMethod[] = [
  {
    href: "https://community.reduct.store/",
    icon: FaComments,
    title: "Community Discussions",
    description: "Join our community for discussions and tips",
    linkText: "Community Forum",
  },
  {
    href: "https://github.com/reductstore/reductstore/issues",
    icon: FaLifeRing,
    title: "Technical Support",
    description: "Report issues or request technical assistance",
    linkText: "GitHub Issues",
  },
  {
    href: "https://www.linkedin.com/company/reductstore",
    icon: FaLinkedinIn,
    title: "Follow Us on LinkedIn",
    description: "Stay updated with company news and insights",
    linkText: "LinkedIn Company Page",
  },
  {
    href: "https://www.youtube.com/@ReductStore",
    icon: FaYoutube,
    title: "Watch Tutorials & Demos",
    description: "Learn with video guides and product demos",
    linkText: "YouTube Channel",
  },
];

interface ContactMethodCardProps {
  method: ContactMethod;
}

function ContactMethodCard({ method }: ContactMethodCardProps) {
  const IconComponent = method.icon;
  const isExternal = method.href.startsWith("http");

  return (
    <a
      href={method.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={styles.contactMethodLink}
    >
      <div className="card">
        <div className="card__header">
          <div className={styles.iconWrapper}>
            <IconComponent className={styles.contactIcon} />
          </div>
        </div>
        <div className="card__body">
          <h3>{method.title}</h3>
          <p>{method.description}</p>
          <span className={styles.contactLink}>{method.linkText}</span>
        </div>
      </div>
    </a>
  );
}

export default function ContactPage() {
  return (
    <Layout
      title="Contact Us for More Information"
      description="Reach out to the ReductStore team for support, inquiries, or feedback. We're here to help you with any questions you may have."
    >
      <main>
        <SimpleHeader pageTitle="Let's Connect" />
        <div className={clsx("container", styles.contactContainer)}>
          <p className={styles.headerIntro}>
            Choose the best way to reach us based on your needs. Whether you're
            looking for community support, technical assistance, or just want to
            stay connected, we're here to help.
          </p>
          <div className="row">
            {/* Contact Methods Column */}
            <div className="col col--6">
              <div className={styles.contactInfo}>
                <div className={styles.contactMethods}>
                  {contactMethods.map((method, index) => (
                    <ContactMethodCard key={index} method={method} />
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="col col--6">
              <div className="card">
                <div className="card__header">
                  <h2>Send Us a Message</h2>
                  <p>
                    Have a specific question or inquiry? Fill out the form below
                    and we'll get back to you as soon as possible.
                  </p>
                </div>
                <div className="card__body">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
