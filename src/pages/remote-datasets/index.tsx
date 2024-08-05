import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import ImageCarousel from "@site/src/components/ImageCarousel";

export default function RemoteDatasetsPage(): JSX.Element {
  return (
    <Layout
      title="Remote Datasets for Computer Vision"
      description="Interact with image datasets using ReductStore's Time Series Object Store. Explore IMDB reviews, cat images, and MNIST digits in this live demo."
    >
      <main>
        <SimpleHeader pageTitle="Remote Datasets for Computer Vision" />
        <div className="container">
          <p>
            Explore image datasets stored in ReductStore on a remote server accessible through <b><Link href="https://play.reduct.store">https://play.reduct.store</Link></b>.
            These datasets are freely available for use with the password (token) <b>"reductstore"</b>, allowing you to access and download the images.
            On this page you can browse the following demo datasets: IMDB, cat pictures, and MNIST handwritten digits.
          </p>
          <p>
            These images come with labels that are ideal for training deep learning models.
            For example, you can use these datasets to train models with PyTorch.
            Check out the blog <b><Link to="/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch">Implementing data streaming in PyTorch from a remote database</Link></b> for detailed instructions.
          </p>
          <p>
            If you have any questions, want to collaborate, or need another dataset, please <b><Link to="/contact">contact us</Link></b> or join us on our <b><Link href="https://discord.com/invite/BWrCncF5EP">Discord server</Link></b>.
          </p>
          <ImageCarousel />
        </div>
      </main>
    </Layout >
  );
}
