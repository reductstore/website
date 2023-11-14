import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import WhitePaperForm from "@site/src/components/WhitePaperForm";
import styles from './styles.module.css';

const LogoImg = require("@site/static/img/whitepaper/whitepaper.jpg").default;

export default function ReductAI(): JSX.Element {
  return (
    <Layout
      title="Reduct AI - White Paper"
      description="ReductAI is a platform for building and deploying AI models."
    >
      <main>
        <SimpleHeader pageTitle="Reduct AI" />
        <div className="container">
          <div className="row">
            <div className="col col--6">
              <WhitePaperForm />
            </div>
            <div className="col col--4 col--offset-1 hideOnMobile">
              <img
                src={LogoImg}
                alt="White Paper Cover"
                className={styles.whitePaperImage}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
